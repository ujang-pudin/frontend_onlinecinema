import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
// import data from "../data/datatvshows.json";

function ContentTVAdmin(props) {
  const [dataFilm, setDataFilm] = useState();

  const Navigate = useNavigate();
  let { data: films } = useQuery("filmsCacheAdmin", async () => {
    const response = await API.get("/film");
    return response.data.data;
  });
  console.log(films);

  function getFilmByCategoryId() {
    const newData = films?.filter((item) => {
      return item.category_id === "1";
    });
    setDataFilm(newData);
    console.log(newData);
  }

  useEffect(() => {
    if (films) getFilmByCategoryId();
  }, [films]);

  const handleDetail = (id) => {
    Navigate("/adminmoviedetails/" + id);
  };
  return (
    <div className="container tv-admin-container" style={{ height: "75vh" }}>
      <div className="content_row">
        {/* title */}
        <h2 className="mt-4">{props.category}</h2>

        {/* cards horizontal */}
        <div className="cards_row">
          <Swiper
            slidesPerView={5}
            spaceBetween={50}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {dataFilm?.map((item, id) => {
              return (
                <SwiperSlide>
                  <Link
                    to={"/admintvdetails/" + item.id}
                    key={id}
                    className="card_item"
                  >
                    <img
                      className="img_size_tv_home"
                      // src={require("../../Images/default.png")}

                      src={item.thumbnailfilm}
                      alt="img_size"
                    />
                    <h5 className="mt-3">{item.title}</h5>
                    <p className="fw-lighter">{item.year}</p>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default ContentTVAdmin;

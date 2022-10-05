import React, { useContext } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";
// import data from "../data/datatvshows.json";

function ContentTV(props) {
  const [dataFilm, setDataFilm] = useState();

  let { data: films } = useQuery("filmsCache", async () => {
    const response = await API.get("/film");
    return response.data.data;
  });

  console.log(films);

  function getFilmByCategoryId() {
    const newData = films?.filter((item) => {
      return item.category_id === "1";
    });
    // console.log(newData);

    setDataFilm(newData);
  }

  useEffect(() => {
    getFilmByCategoryId();
  }, [films]);

  try {
  } catch (error) {}
  return (
    <div className="container tv-admin-container">
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
                    to={"/movies/" + item.id}
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

export default ContentTV;

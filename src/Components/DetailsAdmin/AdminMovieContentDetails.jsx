import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../config/api";
import { useContext } from "react";
import { UserContext } from "../../context/context";

function AdminMovieContentDetails() {
  const [modalShow, setModalShow] = React.useState(false);
  const [state, dispatch] = useContext(UserContext);

  function showModal() {
    setModalShow(true);
  }

  const handleBackMovies = () => {
    Navigate("/addlistpage");
  };

  let Navigate = useNavigate();
  let { id } = useParams();
  let { data: films } = useQuery("filmCache", async () => {
    const response = await API.get("/film/" + id);
    // console.log(response);
    return response.data.data;
  });

  React.useEffect(() => {
    // films;
  }, []);

  // console.log(films);
  return (
    <div className="container">
      <div class="ratio ratio-16x9 trailer_movies">
        <iframe
          src={films?.linkfilm}
          title={films?.title}
          allowfullscreen
          className="embed-responsive"
        ></iframe>
      </div>

      <div className="row">
        <div className="col-md-3 mb-3">
          <img
            className="img"
            src={films?.thumbnailfilm}
            alt="default.img"
            style={{ width: "300px", height: "300px" }}
          />
        </div>

        <div className="col-md-3">
          <h2>{films?.title}</h2>
          <div>
            <span className="me-3 fw-lighter">{films?.year}</span>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => Navigate("/addlistpage")}
            >
              {films?.category.name}
            </button>
          </div>
          <p className="detail_desc">{films?.description}</p>
        </div>

        <div className="col-md-6">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            <SwiperSlide>
              <div className="carousel-item active">
                <img
                  src={require("../../Images/default.png")}
                  className="d-block w-100 img"
                  alt="..."
                />
                <p className="text-center mt-2">Playing Now!</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default AdminMovieContentDetails;

import React from "react";
// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../config/api";
import { useContext } from "react";
import { UserContext } from "../../context/context";

function AdminTVContentDetails() {
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
  // id = id.toString();
  let { data: films } = useQuery("filmCache", async () => {
    const response = await API.get("/film/" + id);
    // console.log(response);
    return response.data.data;
  });

  // console.log(films);

  return (
    <div class="container" style={{ height: "100vh" }}>
      <div class="row-cols-1 row-cols-md-6 g-5 my-5 d-flex">
        <div className="col-md-4 mb-5">
          <div className="">
            {/* <Link to={"/movies/" + item.id} key={id} className="card_item"> */}
            <img
              src={films?.thumbnailfilm}
              className="card-img rounded "
              style={{ height: "485px", width: "349px" }}
              alt="img"
            />
            {/* </Link> */}
          </div>
        </div>
        <div className="col-md-8" style={{ height: "100vh" }}>
          <div className="row ">
            <div
              className="col"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "700",
                  fontSize: "48px",
                  lineHeight: "65.57px",
                  // width: "276px",
                  height: "66px",
                  letterSpacing: "2px",
                }}
              >
                {films?.title}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col ratio ratio-16x9 mt-5">
              <iframe
                src={films?.linkfilmbuyed}
                title={films?.title}
                allow="fullscreen"
                className="embed-responsive"
                style={{ width: "100%", height: "60%" }}
              ></iframe>
            </div>
          </div>
          <div className="row" style={{ marginTop: "-10%" }}>
            <div className="col-md-12">{films?.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTVContentDetails;

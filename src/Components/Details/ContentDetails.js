import React from "react";

// import "swiper/css/navigation";
// import required modules
// import { Navigation } from "swiper";

import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../config/api";
import { useContext } from "react";
import { UserContext } from "../../context/context";
import { Button } from "react-bootstrap";
import ModalPayment from "../ModalPayment";
import { useState } from "react";

function AdminMovieContentDetails() {
  const [state, dispatch] = useContext(UserContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowPayment, setModalShowPayment] = useState(false);

  function showModal() {
    setModalShow(true);
  }

  const handleBackMovies = () => {
    Navigate("/addlistpage");
  };

  function paymentHandler(e) {
    e.preventDefault();
    // Navigate("/payment");
  }

  let Navigate = useNavigate();
  let { id } = useParams();
  let { data: films } = useQuery("filmCache", async () => {
    const response = await API.get("/film/" + id);
    // console.log(response);
    return response.data.data;
  });

  React.useEffect(() => {
    setModalShowPayment();
  }, []);

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
        <div className="col-md-8">
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
              {state.isLogin != true ? (
                ""
              ) : (
                <>
                  <Button
                    onClick={() => setModalShowPayment(true)}
                    style={{
                      background: "rgba(205, 46, 113, 1)",
                      border: "none",
                      fontWeight: "bold",
                      padding: "8px 20px",
                    }}
                  >
                    Buy Now
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col ratio ratio-16x9 mt-5">
              <iframe
                src={films?.linkfilm}
                title={films?.title}
                allow="fullscreen"
                className="embed-responsive"
                style={{ width: "100%", height: "60%" }}
              ></iframe>
            </div>
          </div>
          {/* <div className="row"> */}
          <div className="" style={{ marginTop: "-15vh" }}>
            {films?.description}
          </div>
          {/* </div> */}
        </div>
      </div>
      <div>
        <ModalPayment
          onClick={paymentHandler}
          show={modalShowPayment}
          onHide={() => setModalShowPayment(false)}
          title={films?.title}
          price={films?.price}
        />
      </div>
    </div>

    // <div className="container">
    //   <div class="ratio ratio-16x9 trailer_movies">
    //     <iframe
    //       src={films?.linkfilm}
    //       title={films?.title}
    //       allow="fullscreen"
    //       // className="embed-responsive"
    //     ></iframe>
    //   </div>

    //   <div className="row">
    //     <div className="col-md-3 mb-3">
    //       <img
    //         className="img"
    //         src={films?.thumbnailfilm}
    //         alt="default.img"
    //         style={{ width: "300px", height: "300px" }}
    //       />
    //     </div>

    //     <div className="col-md-3">
    //       <h2>{films?.title}</h2>
    //       <div>
    //         <span className="me-3 fw-lighter">{films?.year}</span>
    //         <button
    //           className="btn btn-outline-light btn-sm"
    //           onClick={() => Navigate(`/`)}
    //         >
    //           {films?.category.name}
    //         </button>
    //       </div>
    //       <p className="detail_desc">{films?.description}</p>
    //     </div>
    //   </div>
    // </div>
  );
}

export default AdminMovieContentDetails;

import React from "react";
import TopNavbar from "../Utility/TopNavbar";

import ContentTV from "./ContentTV";
import { useContext } from "react";
import { UserContext } from "../../context/context";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
// import BgBanner from "../../Images/BanerHome.png";
// import exampleImg from "../../Images/spiderman.jpg";
import imageBanner from "../../Images/BanerHome.png";
import TitleBanner from "../../Images/DEAD POOL.png";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalPayment from "../ModalPayment";

function HomeScreen() {
  const [state, dispatch] = useContext(UserContext);
  // console.log(state);

  let Navigate = useNavigate();
  const [dataFilm, setDataFilm] = useState();
  // console.log(dataFilm);

  function handlerDetail(e) {
    e.preventDefault(alert("Please Login"));
    Navigate("/");
  }

  let { data: films } = useQuery("filmsCacheAll", async () => {
    const response = await API.get("/film");
    return response.data.data;
  });

  function getFilm() {
    const newData = films?.map((item, id) => {
      return item;
    });
    // console.log(newData);

    setDataFilm(newData);
  }

  useEffect(() => {
    getFilm();
  }, [films]);

  let data = films;
  // console.log(data);

  return (
    <div style={{ background: "black", fontFamily: "Montserrat" }}>
      <TopNavbar />
      <div className="container d-flex justify-content-center pt-3">
        <div className="row">
          <div className="col">
            <img
              src={TitleBanner}
              alt=""
              srcset=""
              style={{
                position: "absolute",
                top: "105px",
                zIndex: 2,
                color: "#fff",
                left: "380px",
              }}
            />
            <div
              style={{
                lineHeight: "25px",
                fontSize: "16px",
                fontWeight: "400",
                position: "absolute",
                top: "210px",
                zIndex: 2,
                // color: "#fff",
                left: "380px",
                width: "681px",
                height: "70",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  paddingBottom: ".2rem",
                  letterSpacing: "1px",
                  // fontColor: "white",
                  color: "white",
                }}
              >
                ACTION
              </span>
              <p
                style={{
                  fontWeight: "bold",
                  paddingTop: ".2rem",
                  letterSpacing: "1px",
                  // fontColor: "CD2E71",
                  color: "rgba(205, 46, 113, 1)",
                }}
              >
                Rp. 99.000
              </p>
              <p
                style={{
                  paddingTop: ".2rem",
                  letterSpacing: "1px",
                  color: "#fff",
                }}
              >
                Hold onto your chimichangas, folks. From the studio that brought
                you all 3 Taken films comes the block-busting,
                fourth-wall-breaking masterpiece about Marvel Comics’ sexiest
                anti-hero! Starring God’s perfect idiot Ryan Reynolds and a
                bunch of other "actors," DEADPOOL is a giddy slice of
                awesomeness packed with more twists than Deadpool’s enemies’
                intestines and more action than prom night. Amazeballs!
              </p>
              <Button
                style={{
                  background: "rgba(205, 46, 113, 1)",
                  padding: "10px 15px",
                  border: "none",
                }}
              >
                Buy Now
              </Button>
              {/* <MyVerticallyCenteredModal /> */}
            </div>
            <img
              src={imageBanner}
              alt=""
              srcset=""
              style={{ position: "relative", zIndex: 1, top: "0px" }}
              // style={{ paddingLeft: "1rem" }}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <h3 className="mt-5 text-white fw-bold">List Film</h3>
        <div
          className="row row-cols-1 row-cols-md-6 g-5 mt-1"
          // style={{ height: "100vh" }}
        >
          {dataFilm?.map((item, id) => {
            return (
              <div className="col-md-2 mb-5">
                <div className="card h-100">
                  <Link
                    to={"/vehicles/" + item.id}
                    key={id}
                    className="card_item"
                  >
                    <img
                      src={item.thumbnailfilm}
                      className="card-img"
                      style={{ height: "250px" }}
                      alt="img"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <ContentTV category="TV Shows" /> */}
      {/* <Content category="Movies" /> */}
    </div>
  );
}

export default HomeScreen;

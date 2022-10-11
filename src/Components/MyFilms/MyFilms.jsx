import React from "react";
// import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useQuery } from "react-query";
// import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import TopNavbar from "../Utility/TopNavbar";
import { UserContext } from "../../context/context";
import { useContext } from "react";
import { Link } from "react-router-dom";
// import gb from "../../Images/spiderman.jpg";

function MyFilms() {
  const title = "My Films";
  document.title = "CinemaOnline | " + title;
  const [state] = useContext(UserContext);
  const id = state?.user.id;
  let { data: user } = useQuery("user", async () => {
    const response = await API.get("/user/" + id);
    return response.data.data;
  });

  // console.log(user);
  return (
    <div
      className="container"
      style={{ height: "100vh", backgroundColor: "black" }}
    >
      <TopNavbar />
      <div className="container">
        <h3
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            color: "white",
          }}
        >
          My List Film
        </h3>
        <div className="row row-cols-1 row-cols-md-6 g-5 my-3">
          {user?.transaction.map((item, id) => {
            console.log(item);
            return (
              <div className="col-md-2 mb-5">
                <div className="card h-100">
                  <Link
                    to={"/myfilms/" + item.film?.id}
                    key={id}
                    className="card_item"
                  >
                    <img
                      src={`${item.film?.thumbnailfilm}`}
                      // src={item.film.thumbnailfilm}
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
    </div>
  );
}

export default MyFilms;

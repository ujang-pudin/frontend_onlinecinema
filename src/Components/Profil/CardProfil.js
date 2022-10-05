import { Row, Col, Button } from "react-bootstrap";
import { IoIosContact, IoIosMail, IoIosMale, IoMdCall } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import VIPImage from "../../Images/vipimage.png";
import FotoProfile from "../../Images/profil.jpeg";
import { setAuthToken } from "../../config/api";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/context";
import { API } from "../../config/api";
import { useQuery } from "react-query";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CardProfil() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  let Navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const checkUser = async (e) => {
    try {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      };
      const response = await API.get("/user", config);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(state);

  // useEffect(() => {
  checkUser();
  // }, []);

  return (
    <>
      <Row
        className="d-flex justify-content-center align-items-center bg-dark"
        style={{
          maxWidth: "785px",
          height: "600px",
          margin: "auto",
          borderRadius: "20px",
        }}
      >
        <Col md={6}>
          <h6
            className="text-white p-4 fw-bold"
            style={{ letterSpacing: "3px" }}
          >
            Profile Info
          </h6>
          <div className="d-flex mt-1 mx-4">
            <IoIosContact style={{ fontSize: "60px", color: "red" }} />
            <div className="text-white d-flex flex-column ms-3">
              <h6
                style={{
                  fontFamily: "Avenir 85 Heavy",
                  fontStyle: "Heavy",
                  fontSize: "18px",
                  lineHeight: "18px",
                  align: "Left",
                  verticalAlign: "Center",
                  letterSpacing: "2px",
                }}
              >
                {state.user.fullname}
              </h6>
              <p
                style={{
                  fontFamily: "Avenir",
                  fontStyle: "Roman",
                  fontSize: "18px",
                  letterSpacing: "3px",
                }}
                className="text-muted"
              >
                Fullname
              </p>
            </div>
          </div>

          <div className="d-flex mt-1 mx-4">
            <IoIosMail style={{ fontSize: "60px", color: "red" }} />
            <div className="text-white d-flex flex-column ms-3">
              <h6
                style={{
                  fontFamily: "Avenir 85 Heavy",
                  fontStyle: "Heavy",
                  fontSize: "18px",
                  lineHeight: "20px",
                  align: "Left",
                  verticalAlign: "Center",
                  letterSpacing: "2px",
                }}
              >
                {state.user.email}
              </h6>
              <p
                style={{
                  fontFamily: "Avenir",
                  fontStyle: "Roman",
                  fontSize: "18px",
                  letterSpacing: "3px",
                }}
                className="text-muted"
              >
                Email
              </p>
            </div>
          </div>

          <div className="d-flex mt-1 mx-4">
            <img
              src={VIPImage}
              alt="foto"
              style={{ width: "60px", height: "50px" }}
            />
            <div className="text-white d-flex flex-column ms-3">
              <h6
                style={{
                  fontFamily: "Avenir 85 Heavy",
                  fontStyle: "Heavy",
                  fontSize: "18px",
                  lineHeight: "20px",
                  align: "Left",
                  verticalAlign: "Center",
                  letterSpacing: "2px",
                }}
              >
                {state.user.status}
              </h6>
              <p
                style={{
                  fontFamily: "Avenir",
                  fontStyle: "Roman",
                  fontSize: "18px",
                  letterSpacing: "3px",
                }}
                className="text-muted"
              >
                Status
              </p>
            </div>
          </div>

          <div className="d-flex mt-1 mx-4">
            <IoIosMale style={{ fontSize: "60px", color: "red" }} />
            <div className="text-white d-flex flex-column ms-3">
              <h6
                style={{
                  fontFamily: "Avenir 85 Heavy",
                  fontStyle: "Heavy",
                  fontSize: "18px",
                  lineHeight: "20px",
                  align: "Left",
                  verticalAlign: "Center",
                  letterSpacing: "2px",
                }}
              >
                {state.user.gender}
              </h6>
              <p
                style={{
                  fontFamily: "Avenir",
                  fontStyle: "Roman",
                  fontSize: "18px",
                  letterSpacing: "3px",
                }}
                className="text-muted"
              >
                Gender
              </p>
            </div>
          </div>

          <div className="d-flex mt-1 mx-4">
            <IoMdCall style={{ fontSize: "56px", color: "red" }} />
            <div className="text-white d-flex flex-column ms-3">
              <h6
                style={{
                  fontFamily: "Avenir 85 Heavy",
                  fontStyle: "Heavy",
                  fontSize: "18px",
                  lineHeight: "20px",
                  align: "Left",
                  verticalAlign: "Center",
                  letterSpacing: "2px",
                }}
              >
                {state.user.phone}
              </h6>
              <p
                style={{
                  fontFamily: "Avenir",
                  fontStyle: "Roman",
                  fontSize: "18px",
                  letterSpacing: "3px",
                }}
                className="text-muted"
              >
                Phone
              </p>
            </div>
          </div>

          <div className="d-flex mt-1 mx-4">
            <IoLocationSharp style={{ fontSize: "60px", color: "red" }} />
            <div className="text-white d-flex flex-column ms-3">
              <h6
                style={{
                  fontFamily: "Avenir 85 Heavy",
                  fontStyle: "Heavy",
                  fontSize: "18px",
                  lineHeight: "20px",
                  align: "Left",
                  verticalAlign: "Center",
                  letterSpacing: "2px",
                }}
              >
                {state.user.address}
              </h6>
              <p
                style={{
                  fontFamily: "Avenir",
                  fontStyle: "Roman",
                  fontSize: "18px",
                  letterSpacing: "3px",
                }}
                className="text-muted"
              >
                Address
              </p>
            </div>
          </div>
        </Col>

        <Col md={6} className="text-center">
          <Row>
            <Col>
              <img
                src={FotoProfile}
                alt="foto"
                style={{
                  maxWidth: "280px",
                  height: "345px",
                  borderRadius: "5px",
                }}
              />
            </Col>

            <Col>
              <Button
                style={{
                  backgroundColor: "red",
                  border: "none",
                  width: "280px",
                }}
                className="mt-3"
              >
                <input
                  type="file"
                  name="uploadfile"
                  id="img"
                  style={{ display: "none" }}
                />
                <label for="img">Choose Image Profile</label>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default CardProfil;

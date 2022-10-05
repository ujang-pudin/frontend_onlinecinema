import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ModalRegister from "../Modal";
import ModalLogin from "../ModalLogin";
import { Link, useNavigate } from "react-router-dom";
import dropdownFilm from "../../Images/Icons/Film-Icon-Admin.png";

//images import

import Logo from "../../Images/IconOnlineCinema.png";
import User from "../../Images/User-Icon.png";
import dropdownUser from "../../Images/Icons/Icon-User2.png";
import dropdownPayment from "../../Images/Icons/bill-1.png";
import dropdownLogout from "../../Images/Icons/logout-icon-drowndown.png";
import { UserContext } from "../../context/context";
import { useEffect } from "react";

function TopNavbar() {
  let Navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
  };

  // console.log(state);
  let { ...data } = state.user;
  // console.log(data);
  // console.log(state.user.status);
  // var getToken = localStorage.getItem("token");
  // if (getToken != null) {
  //   console.log("oke");
  // }

  // const [isLogin, setisLogin] = useState();

  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function homeHandler() {
    Navigate("/");
  }

  function tvHandler(e) {
    e.preventDefault();
    Navigate("/");
  }
  function moviesHandler() {
    Navigate("/movies");
  }

  function profileHandler(e) {
    e.preventDefault();
    Navigate("/profile");
  }

  function myFilms(e) {
    e.preventDefault();
    Navigate("/myfilms");
  }

  return (
    <>
      <Navbar bg="black" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Navbar.Brand
                onClick={homeHandler}
                className="df-brand"
                style={{ width: "60%" }}
              >
                <img src={Logo} alt="logo" className="nav-img-center" />
              </Navbar.Brand>
              <Nav.Link onClick={tvHandler} className="top-navbar"></Nav.Link>
            </Nav>

            {state.isLogin ? (
              <>
                {" "}
                <NavDropdown
                  title={
                    <>
                      <img
                        src={User}
                        width="40"
                        height="40"
                        className="rounded-circle mx-5"
                        alt="User Icons"
                      />
                    </>
                  }
                  id="basic-nav-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item onClick={(e) => profileHandler(e)}>
                    <img
                      src={dropdownUser}
                      width="20"
                      height="20"
                      alt="icon user"
                    />{" "}
                    <span className="ms-2">Profile </span>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={myFilms}>
                    <img
                      src={dropdownFilm}
                      width="20"
                      height="20"
                      alt="icon user"
                    />{" "}
                    <span className="ms-2">My Film </span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/">
                    <img
                      src={dropdownLogout}
                      width="20"
                      height="20"
                      alt="icon user"
                    />{" "}
                    <span className="ms-2" onClick={logout}>
                      Logout
                    </span>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Button
                  onClick={handleShowLogin}
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    padding: "8px 15px",
                    background: "none",
                  }}
                >
                  Login
                </Button>
                <Button
                  className="mx-3"
                  onClick={handleShow}
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    background: "rgba(205, 46, 113, 1)",
                    border: "none",
                    padding: "8px 15px",
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalRegister
        setShow={setShow}
        show={show}
        setShowLogin={setShowLogin}
        showLogin={showLogin}
        setisLogin={state.isLogin}
        isLogin={state.isLogin}
      />
      <ModalLogin
        setShowLogin={setShowLogin}
        showLogin={showLogin}
        setShow={setShow}
        show={show}
      />
    </>
  );
}

export default TopNavbar;

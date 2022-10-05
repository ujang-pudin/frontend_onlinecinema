import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../Images/IconOnlineCinema.png";
import User from "../../Images/User-Icon.png";

import dropdownFilm from "../../Images/Icons/Film-Icon-Admin.png";
import dropdownLogout from "../../Images/Icons/logout-icon-drowndown.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/context";
import { useMutation } from "react-query";
import { AiOutlineDollar } from "react-icons/ai";

function TopNavbarAdmin() {
  const [state, dispatch] = useContext(UserContext);
  let Navigate = useNavigate();

  function adminFilmHandler(e) {
    e.preventDefault();
    Navigate("/addlistpage");
  }

  function adminTransactions(e) {
    e.preventDefault();
    Navigate("/listtransactions");
  }

  function logoAdminHandler(e) {
    e.preventDefault();
    Navigate("/listtransactions");
  }

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    // Navigate("/");
    // this.authToken = null;
    // this.user = null;
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
  };

  return (
    // <Navbar bg="dark" expand="lg" variant="dark">
    <Navbar
      expand="lg"
      style={{
        background: "black",
        fontFamily: "Montserrat",
      }}
    >
      <Container>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Navbar.Brand
              onClick={logoAdminHandler}
              className="active top-navbar"
            >
              <img
                src={Logo}
                width="115"
                height="35"
                className="d-inline-block align-top logo-admin-navbar"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </Nav>
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
            <NavDropdown.Item onClick={adminFilmHandler}>
              <img src={dropdownFilm} width="20" height="20" alt="icon user" />{" "}
              <span className="ms-2">Film </span>
            </NavDropdown.Item>

            <NavDropdown.Item onClick={adminTransactions}>
              <AiOutlineDollar style={{ color: "red", fontSize: "23px" }} />
              <span className="ms-2">List Transactions</span>
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
                Logout{" "}
              </span>
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbarAdmin;

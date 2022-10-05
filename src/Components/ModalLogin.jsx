import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/context";
import { Alert } from "react-bootstrap";
import { API } from "../config/api";
import { useMutation } from "react-query";

const ModalLogin = ({ showLogin, setShowLogin, setShow }) => {
  // console.log(showLogin);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  let Navigate = useNavigate();

  const title = "Login";
  document.title = "CinemaOnline | " + title;

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);

      // console.log(response);

      // Checking process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        // Status check
        if (response.data.data.status === "admin") {
          Navigate("/transactionlist");
        } else {
          Navigate("/");
          handleCloseLogin();
        }
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger " className="py-1 text-center text-bold">
          <h4 show={showLogin} setShow={handleCloseLogin}>
            LOGIN FAILED
          </h4>
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  function handleAccountLogin() {
    handleCloseLogin();
    setShow(true);
  }

  return (
    <div className="modal-container w-100">
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          {message && message}
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title className="modal-title my-3 mx-4">Login</Modal.Title>
            </Modal.Header>

            <Modal.Body className="mx-4">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  className="modal-register-group"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  className="modal-register-group"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
              <span className="mx-auto align-middle modal-account">
                Don't have an account ? Click{" "}
                <ins
                  className="modal-account-here"
                  onClick={handleAccountLogin}
                >
                  Here
                </ins>
              </span>
            </Modal.Body>

            <Modal.Footer className="mx-4">
              <Button
                className="btn-modal-login w-100 my-3"
                type="submit"
                style={{ background: "rgba(205, 46, 113, 1)", border: "none" }}
              >
                Login
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalLogin;

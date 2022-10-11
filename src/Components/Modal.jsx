import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { Alert } from "react-bootstrap";

const ModalRegister = ({
  show,
  setShow,
  setShowLogin,
  isLogin,
  setisLogin,
}) => {
  const [data, setData] = useState();
  const title = "Register";
  document.title = "Dumbflix | " + title;

  //context API here

  const [message, setMessage] = useState(null);

  let navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });

  const { fullname, email, password, phone } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let Navigate = useNavigate();

  function handleAccount() {
    handleClose();
    setShowLogin(true);
  }

  const handleRegister = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);

      console.log(response.data);

      if (response.data.code === 200) {
        const alert = (
          <Alert variant="success" className="py-1 ">
            Register Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          fullname: "",
          email: "",
          password: "",
          // gender: "",
          phone: "",
          // address: "",
        });
        handleClose();
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger " className="py-1 text-center text-bold">
          <h4>Register Failed</h4>
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div className="modal-container w-100">
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => handleRegister.mutate(e)}>
          {message && message}
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title className="modal-title my-3">Register</Modal.Title>
            </Modal.Header>

            <Modal.Body className="mx-4">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  className="modal-register-group"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  className="modal-register-group"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicFullName">
                <Form.Control
                  className="modal-register-group"
                  type="Text"
                  placeholder="Full Name"
                  name="fullname"
                  value={fullname}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Control
                  className="modal-register-group"
                  type="phone"
                  placeholder="Phone"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                />
              </Form.Group>
              <span className="mx-auto align-middle modal-account">
                Already have an account ? Click{" "}
                <ins className="modal-account-here" onClick={handleAccount}>
                  Here
                </ins>
              </span>
            </Modal.Body>

            <Modal.Footer className="mx-4">
              <Button
                className="btn-modal-register w-100 my-3"
                variant="light"
                type="submit"
                // onClick={handleAccount}
                message={message}
              >
                Register
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalRegister;

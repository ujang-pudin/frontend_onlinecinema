import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import TopNavbarAdmin from "../Components/Utility/TopNavAdmin";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import TopNavbar from "../Utility/TopNavbar";
import { useContext } from "react";
import { UserContext } from "../../context/context";
import { useQuery } from "react-query";
// import { Navigate } from "react-router-dom";

const UpdateUserForm = () => {
  const title = "Edit User";
  document.title = "CinemaOnline | " + title;

  const [state] = useContext(UserContext);
  const [preview, setPreview] = useState(null); //For image preview
  const [categories, setCategories] = useState([]); //Store all category data
  const navigate = useNavigate();

  const id = state.user?.id;
  console.log(id);
  const [form, setForm] = useState({
    fullname: "",
    // email: "",
    // password: "",
    phone: "",
    image: "",
  });

  // console.log(form);
  let { data: user } = useQuery("userCache", async () => {
    const response = await API.patch("/user/" + { id });
    return response.data.data;
  });

  console.log(user);

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
    console.log(form);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("fullname", form.title);
      formData.set("image", form.image[0], form.image[0].name);
      console.log(form.image);
      // formData.set("password", form.password);
      formData.set("phone", form.phone);

      // Insert product data
      const response = await API.post("/users", formData, config);
      console.log(response);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    // getCategories();
  }, []);

  // let Navigate = useNavigate();

  // function addButtonHandler() {
  //   Navigate("/");
  // }

  // console.log(form);
  return (
    <div
      className="admin-add-movie-body fw-bold"
      style={{ height: "100vh", background: "black", fontFamily: "Montserrat" }}
    >
      <TopNavbar />
      <div
        className="d-flex m-auto"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Form className="w-75 mx-auto" onSubmit={(e) => handleSubmit.mutate(e)}>
          <h2 className="admin-add-movie-title py-4 fw-bold">Add Film</h2>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Fullname"
              className="admin-add-movie-form"
              name="fullname"
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formGridYear">
            <Form.Control
              placeholder="Email"
              className="admin-add-movie-form"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="formGridYear">
            <Form.Control
              placeholder="Phone"
              className="admin-add-movie-form"
              name="phone"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-5">
            <Form.Control
              //   style={{ background: "#BCBCBC" }}
              placeholder="Attach Thumbnail"
              className="admin-add-movie-form"
              name="image"
              type="file"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="admin-add-movie-button fw-bold"
            style={{ background: "rgba(205, 46, 113, 1)", border: "none" }}
          >
            Add Film
          </Button>

          {/* <Row className="mb-3">
            <Col xs={9}>
              <Form.Control
                placeholder="Title Episode"
                className="admin-add-movie-form"
              />
            </Col>
            <Col>
              <div className="d-flex">
                <Form.Control placeholder="Attach Thumbnail" />
                <img
                  src={Thumbnail}
                  width="15"
                  height="100%"
                  alt="Thumbnail"
                  className="mt-2 mx-1"
                />
              </div>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formGridLinkFilm">
            <Form.Control
              placeholder="Link Film"
              className="admin-add-movie-form"
            />
          </Form.Group>

          <Button
            className="admin-add-movie-btn-add btn-lg w-100 mb-3"
            variant="outline-light"
          >
            +
          </Button> */}

          {/* <Button
            variant="danger"
            type="submit"
            className="admin-add-movie-button"
            // onClick={addButtonHandler}
            onClick={addButtonHandler}
            // onSubmit
          >
            Submit
          </Button> */}
        </Form>
      </div>
    </div>
  );
};

export default UpdateUserForm;

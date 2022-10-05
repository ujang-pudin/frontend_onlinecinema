import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import TopNavbarAdmin from "../Components/Utility/TopNavAdmin";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";
// import { Navigate } from "react-router-dom";

const AdminAddMovies = () => {
  const title = "Add Movies";
  document.title = "CinemaOnline | " + title;
  const [preview, setPreview] = useState(null); //For image preview
  const [categories, setCategories] = useState([]); //Store all category data

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    thumbnailfilm: "",
    price: "",
    linkfilmbuyed: "",
    linkfilm: "",
    category_id: "",
    description: "",
  });

  // console.log(form);
  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get("/category");
      setCategories(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("getCategories" + " " + getCategories());

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
      formData.set("title", form.title);
      formData.set("thumbnailfilm", form.image[0], form.image[0].name);
      console.log(form.thumbnailfilm);
      formData.set("price", form.price);
      formData.set("linkfilmbuyed", form.linkfilmbuyed);
      formData.set("linkfilm", form.linkfilm);
      formData.set("category_id", form.category_id);
      formData.set("description", form.description);

      // Insert product data
      const response = await API.post("/film", formData, config);
      console.log(response);

      navigate("/addlistpage");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
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
      <TopNavbarAdmin />
      <div
        className="d-flex m-auto"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Form className="w-75 mx-auto" onSubmit={(e) => handleSubmit.mutate(e)}>
          <h2 className="admin-add-movie-title py-4 fw-bold">Add Film</h2>
          <Row className="mb-3">
            <Col xs={9}>
              <Form.Control
                placeholder="Title"
                className="admin-add-movie-form"
                name="title"
                onChange={handleChange}
                required
              />
            </Col>
            <Col>
              <Form.Group controlId="formThumb">
                <Form.Label className="admin-add-movie-thumb text-start pt-1">
                  <p className="ms-3 text-white">Attach Thumbnail</p>
                </Form.Label>
                <Form.Control
                  placeholder="Attach Thumbnail"
                  className="admin-add-movie-thumb-file"
                  name="image"
                  type="file"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formGridYear">
            <Form.Control
              placeholder="Price"
              className="admin-add-movie-form"
              name="price"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridYear">
            <Form.Control
              placeholder="Link Film"
              className="admin-add-movie-form"
              name="linkfilmbuyed"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridYear">
            <Form.Control
              placeholder="Link Film Trailer"
              className="admin-add-movie-form"
              name="linkfilm"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridCategory">
            <Form.Select
              defaultValue="Movies"
              className="admin-add-movie-form"
              name="category_id"
              onChange={handleChange}
              required
            >
              <option hidden>Choose</option>
              {categories?.map((item) => (
                <option value={item?.id}>{item?.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-5" controlId="formGridDesc">
            <Form.Control
              as="textarea"
              placeholder="Description"
              className="admin-add-movie-form"
              name="description"
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

export default AdminAddMovies;

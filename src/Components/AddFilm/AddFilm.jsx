import React from "react";
import { Button, Modal, Form, Col, Row, Alert } from "react-bootstrap";
import { IoAttachOutline } from "react-icons/io5";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { useMutation } from "react-query";
import { useEffect } from "react";

function AddFilm(props) {
  // const title = "Add Film";
  // document.title = "Dumbflix | " + title;

  const [message, setMessage] = useState(null);
  let navigate = useNavigate();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    title: " ",
    thumbnailfilm: " ",
    year: " ",
    category_id: " ",
    description: " ",
  }); //Store product data

  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get("/category");
      setCategories(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(getCategories);

  // Handle change data on form
  // const handleChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]:
  //       e.target.type === "file" ? e.target.files : e.target.value,
  //   });

  //   // Create image url for preview
  //   if (e.target.type === "file") {
  //     let url = URL.createObjectURL(e.target.files[0]);
  //     setPreview(url);
  //   }
  // };

  // const { title, thumbnailfilm, year, category_id, description } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  let Navigate = useNavigate();

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
      formData.set("kolom", form.kolom[0], form.kolom[0].name);
      formData.set("title", form.title);
      formData.set("year", form.year);
      formData.set("category_id", form.category_id);
      formData.set("description", categoryId);

      console.log(form);

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

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter text-center">
          Add Episode
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail" md={8}>
              <Form.Control
                type="text"
                placeholder="Title Episode"
                name="title"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Control
                type="file"
                placeholder="Attach Thumbnail"
                hidden=""
                name="kolom"
                onChange={handleChange}
              />
              <IoAttachOutline />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="Link Film"
              name="linkfilm"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Col md={3}>
          <Button
            onClick={props.onHide}
            className="btn btn-danger fw-bold w-100"
          >
            Add
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
}

export default AddFilm;

import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
// import TopNavbar from "../Utility/TopNavbar";
import { useContext } from "react";
import { UserContext } from "../context/context";

function ModalPayment(props) {
  const title = "Payment";
  document.title = "CinemaOnline | " + title;
  let Navigate = useNavigate();
  const [state] = useContext(UserContext);

  let { id } = useParams();
  let { data: films } = useQuery("filmCache", async () => {
    const response = await API.get("/film/" + id);
    // console.log(response);
    return response.data.data;
  });
  let { data: profile, refetch: profileRefetch } = useQuery(
    "profileCache",
    async () => {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      };
      const response = await API.get("/check-auth", config);
      return response.data.data;
    }
  );

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    // const myMidtransClientKey = "SB-Mid-client-stNP1LORimDrtwe4";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    console.log("ini data state", state);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async (e) => {
    try {
      // Insert transaction data
      const response = await API.post(
        "/transaction",
        {
          user_id: state?.id,
          film_id: parseInt(id),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        },
        {
          validateStatus: () => true,
        }
      );
      console.log(response);
      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          Navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          Navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {}
  });

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h5 style={{ color: "white", fontWeight: "bold" }}>
          Cinema<span style={{ color: "rgba(205, 46, 113, 1)" }}>Online </span>:
          0981312323
        </h5>
        <h3
          style={{
            color: "white",
            fontWeight: "bold",
          }}
          className="mt-3 ms-0"
        >
          {props.title}
        </h3>
        <p
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Total:{" "}
          <span style={{ color: "rgba(205, 46, 113, 1)" }}>
            Rp. {props.price}
          </span>
        </p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Input Your Account Number"
          />
          <Form.Control
            className="mb-3"
            type="file"
            placeholder="Attache Here"
          />
        </Form.Group>
      </Modal.Body>

      <Button
        type="submit"
        onClick={(e) => handleBuy.mutate(e)}
        className="mx-3"
        style={{ background: "rgba(205, 46, 113, 1)", border: "none" }}
        // onClick={props.onHide}
      >
        Pay
      </Button>
    </Modal>
  );
}

export default ModalPayment;

import React from "react";
// import { Row,Col,Button } from 'react-bootstrap'
import TopNavbar from "../Utility/TopNavbar";
import CardProfil from "./CardProfil";
import { API, setAuthToken } from "../../config/api";
import { useQuery } from "react-query";
import { UserContext } from "../../context/context";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import profilpict from "../../Images/default.png";
import { Button } from "react-bootstrap";

export default function Profil() {
  const title = "Profile";
  document.title = "CinemaOnline | " + title;
  const [state, dispatch] = useContext(UserContext);
  const id = state?.user.id;
  // console.log(state.user.id);
  let { data: user } = useQuery("user", async () => {
    const response = await API.get("/user/" + id);
    return response.data.data;
  });
  // console.log(user?.transaction.status);

  return (
    <div style={{ background: "black" }}>
      <TopNavbar />
      {/* <div className="container" style={{ width: "100vh" }}> */}
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: "3rem auto auto auto",
          width: "80%",
          height: "200vh",
          fontFamily: "Montserrat",
        }}
      >
        <div className="row d-flex">
          <div className="col text-center text-white mb-5">
            <h3>My Profile</h3>
          </div>
          <div className="col text-center text-white mb-5">
            <h3>History Transaction</h3>
          </div>
        </div>

        <div className="row d-flex text-white">
          <div className="col bg-black d-flex justify-content-center ">
            <img
              src={profilpict}
              alt="default"
              srcset=""
              style={{ width: 180, height: 221 }}
              className="flex-1 me-2 rounded"
            />
            <div className="flex-1 ms-2">
              <div className="flex-1">
                <h5 style={{ color: "rgba(205, 46, 113, 1)" }}>Fullname</h5>
                <p>{user?.fullname}</p>
              </div>
              <div className="flex-1">
                <h5 style={{ color: "rgba(205, 46, 113, 1)" }}>Email</h5>
                <p>{user?.email}</p>
              </div>
              <div className="flex-1">
                <h5 style={{ color: "rgba(205, 46, 113, 1)" }}>Phone</h5>
                <p>{user?.phone}</p>
              </div>
            </div>
          </div>

          {/* Transactions */}

          <div className="col" style={{ background: "black" }}>
            {user?.transaction.map((item, i) => {
              return (
                <div
                  className="col-md m-auto p-3 rounded mt-3"
                  style={{ background: "rgba(205, 46, 113, 0.44)" }}
                  key={i}
                >
                  <h3>{item.film.title}</h3>
                  <p style={{ fontWeight: "bold" }}>
                    {new Date(item.startDate).toLocaleString("en-us", {
                      weekday: "long",
                    }) +
                      ", " +
                      new Date(item.startDate).toISOString().split("T")[0]}
                  </p>
                  <div
                    className="justify-content-between d-flex"
                    // style={{ background: "rgba(205, 46, 113, 0.44)" }}
                  >
                    <p>Total: Rp {item.film.price}</p>
                    <p
                      className={`${
                        item.status.toLowerCase() === "success"
                          ? "bg-success"
                          : "bg-warning"
                      } rounded`}
                      style={{
                        color: "white",
                        border: "none",
                        padding: "6px",
                      }}
                    >
                      {item.status.toLowerCase() === "success"
                        ? "Finished"
                        : "Pending"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// data transactions

{
  /* <div className="col">
{user?.transaction.map((item, i) => {
  return (
    <div
      className="col-md m-auto p-3 rounded mt-3"
      style={{ background: "rgba(205, 46, 113, 0.44)" }}
      key={i}
    >
      <h3>{item.film.title}</h3>
      <h5>{item.startDate}</h5>
      <div
        className="justify-content-between d-flex"
        // style={{ background: "rgba(205, 46, 113, 0.44)" }}
      >
        <p>Price: Rp {item.film.price}</p>
        <p
          className={`${
            item.status.toLowerCase() === "success"
              ? "bg-success"
              : "bg-warning"
          } rounded`}
          style={{
            color: "white",
            border: "none",
            padding: "10px",
          }}
        >
          {item.status.toLowerCase() === "success"
            ? "Finished"
            : "Pending"}
        </p>
      </div>
    </div>
  );
})}
</div> */
}

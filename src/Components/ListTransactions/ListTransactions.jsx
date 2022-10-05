import React from "react";
import Table from "react-bootstrap/Table";
import { Row, Col, Container } from "react-bootstrap";
import { Button, Dropdown } from "react-bootstrap";
import TopNavAdmin from "../Utility/TopNavAdmin";
// import { ButtonAction } from "./ButtonAction";
// import data from "../data/transaction.json";
import { API } from "../../config/api";
import { useQuery } from "react-query";
import { useState } from "react";

function ListTransactions() {
  const title = "List Transactions";
  document.title = "CinemaOnline | " + title;
  // Fetching product data from database
  let { data: transaction } = useQuery("transaction", async () => {
    const response = await API.get("/transactions");
    // console.log(response);
    return response.data.data;
  });
  // console.log(transaction);

  // const [action, setAction] = useState("pending");
  // const data = transaction.map((item, id) => {
  //   console.log(item.status);
  // });
  // console.log(data);

  return (
    <Container
      style={{
        background: "black",
        fontFamily: "Montserrat",
        height: "100vh",
      }}
    >
      <Row style={{ background: "black" }}>
        <TopNavAdmin />
      </Row>

      <Row className="mt-5" style={{ background: "black" }}>
        <Col
          className="d-flex justify-content-center"
          style={{ margin: "auto", padding: "auto", background: "black" }}
        >
          <Table striped bordered hover variant="dark" style={{ width: "85%" }}>
            <thead className="text-danger fw-bold">
              <tr>
                <th>ID Transaction</th>
                <th>Users</th>
                <th>Email</th>
                <th>Film</th>
                <th>Price</th>
                {/* <th>Status Users</th> */}
                <th>Status Payment</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {transaction?.map((item, id) => {
                console.log(item);
                // var startdate = new Date(item.startdate);
                // .toISOString()
                // .substring(0, 10);
                // console.log("startdate" + " " + startdate);
                // var duedate = new Date(item.duedate);
                // .toISOString()
                // .substring(0, 10);
                // console.log("duedate" + " " + duedate);
                // var diffDays = parseInt(
                //   (duedate - startdate) / (1000 * 60 * 60 * 24),
                //   10
                // );
                // console.log(diffDays);
                var duedate = new Date(item.duedate).getDate();
                console.log(duedate);

                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.user.fullname}</td>
                    <td>{item.user.email}</td>
                    <td>{item.film.title}</td>
                    <td>{item.film.price}</td>
                    {/* <td className="text-success">item.user.subscribe</td> */}
                    <td
                      className={`${
                        item.status === "pending"
                          ? "text-warning"
                          : item.status === "success"
                          ? "text-success"
                          : "text-danger"
                      } fw-bold`}
                    >
                      {item.status}
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          as={Button}
                          className="text-primary fw-bold bg-none"
                          variant="dark"
                          id="dropdown-basic"
                          // style={{ fontSize: "30px" }}
                        >
                          Action
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                          <Dropdown.Item className="text-success fw-bold">
                            Approved
                          </Dropdown.Item>
                          <Dropdown.Item className="text-danger fw-bold">
                            Cancel
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default ListTransactions;

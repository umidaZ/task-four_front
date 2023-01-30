import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";

const users = [];

const List = () => {
  const [all_users, setAllUsers] = useState([]);

  const fetchUsers = async () => {
    await axios
      .get("/users")
      .then((res) => setAllUsers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container className="mt-5">
      <Table className="" bordered hover>
        <thead>
          <tr className="bg-primary">
            <th className="text-center"></th>
            <th className="text-center">First Name</th>
            <th className="text-center">Last Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">Last Login</th>
            <th className="text-center">Registration Time</th>
            <th className="text-center"> Status </th>
            <th className="text-center"> Block </th>
            <th className="text-center"> Delete </th>
          </tr>
        </thead>
        {all_users.map((user) => {
          const { _id, name, surname, email, login_time, registration_time } =
            user;
          return (
            <tbody>
              <tr>
                <td className="text-center">
                  <input
                    type="checkbox"
                    value={user._id}
                    onChange={(e) => {
                      users.push(e.target.value);
                    }}
                  />
                </td>
                <td className="text-center">{name}</td>
                <td className="text-center">{surname}</td>
                <td className="text-center">{email}</td>
                <td className="text-center">{user.lastLogin}</td>
                <td className="text-center">{user.time}</td>
                <td>
                  <center>
                    <button
                      className={`m-1 btn ${
                        user.status ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {user.status ? "Active" : "Blocked"}
                    </button>
                  </center>
                </td>
                <td>
                  <center>
                    <button
                      className="btn mx-3 px-4 btn-danger"
                      onClick={async () => {
                        await axios
                          .post("/block_user", {
                            id: user._id,
                            status: user.status,
                          })
                          .then((response) => {
                            window.location.reload();
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      Block
                    </button>
                  </center>
                </td>
                <td>
                  <center>
                    <button
                      className="btn mx-3 px-4 btn-primary"
                      onClick={async () => {
                        await axios
                          .post("/delete_user", {
                            id: _id,
                          })
                          .then((response) => {
                            if (response.statusText == "OK") {
                              window.location.reload();
                            }
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      Delete
                    </button>
                  </center>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      <center>
        <button
          type="button"
          className="m-2 btn btn-danger"
          onClick={async () => {
            await axios
              .post("/delete_all_users")
              .then((response) => {
                window.location.reload();
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Delete all users
        </button>
        <button
          type="button"
          className="m-2 btn btn-warning"
          onClick={async () => {
            await axios
              .post("/delete_selected_users", { id: users })
              .then((response) => {
                if (response.statusText == "OK") {
                  window.location.reload();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Delete selected
        </button>
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="m-2 btn btn-primary"
        >
          Sign out
        </button>
      </center>
    </Container>
  );
};

export default List;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchblockedUser = async () => {
    await axios
      .get("/blocked_user", {})
      .then((response) => {
        setStatus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchblockedUser();
  }, []);

  const [auth, setAuth] = useState("");

  return (
    <section className="form-container">
      <h1 className="form-heading">Sign in</h1>
      <div className="form-item" id="email">
        <h1>{auth}</h1>
        <label>Email</label>
        <input
          placeholder="Enter your email"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-item" id="password">
        <label>Password</label>
        <input
          placeholder="Enter your password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button
          onClick={async () => {
            await axios
              .post("/login", {
                email,
                password,
              })
              .then((response) => {
                axios
                  .post("lastLoginUpdate", { email })
                  .then((r) => {
                    console.log(r);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                if (response.status == 200 || response.statusText == "OK") {
                  if (response.data.status) {
                    window.location.href = "/lists";
                  } else {
                    setAuth("not authorized");
                  }
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
          className="form-button"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </section>
  );
};

export default SignIn;

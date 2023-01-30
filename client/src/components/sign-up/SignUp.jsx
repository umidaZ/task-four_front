import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <section className="form-container">
      <h1 className="form-heading">Create an account</h1>
      <div className="form-item" id="name">
        <label>Name</label>
        <input
          placeholder="Enter your name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-item" id="surname">
        <label>Surname</label>
        <input
          placeholder="Enter your name"
          name="name"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>

      <div className="form-item" id="email">
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

      <div className="form-item" id="confirmPassword">
        <label>Confirm Password</label>
        <input
          placeholder="Confirm your password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        onClick={async () => {
          await axios
            .post("/create_user", {
              name: name,
              surname: surname,
              email: email,
              password: password,
              confirmPassword: confirmPassword,
            })
            .then((response) => {
              if (response.status === 200) {
                window.location.href = "/lists";
              }
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        className="form-button"
        type="submit"
      >
        Sign Up
      </button>
    </section>
  );
};

export default SignUp;

import React, { useState } from "react";
import { signup } from "../helper/apicalls";
import { Redirect } from "react-router-dom";
import Style from "./signup.module.css";

const Signup = () => {
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { username, email, password, error, success } = value;

  const handleChange = (username) => (e) => {
    setValue({ ...value, error: false, [username]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValue({ ...value, error: false });
    signup({ username, email, password })
      .then((data) => {
        if (data.error) {
          setValue({ ...value, error: data.error, success: false });
        } else {
          setValue({
            ...value,
            username: "",
            email: "",
            password: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log("error in signup"));
  };
  const successMessage = () => {
    return (
      <div
        style={{
          display: success ? "" : "none",
          width: "100%",
          height: "50px",
          color: "#000",
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        Account Created SuccessFully
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        style={{
          display: success ? "none" : "",
          width: "100%",
          height: "50px",
          color: "#000",
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        {error}
      </div>
    );
  };

  const redirect = () => {
    if (success) {
      return <Redirect to="/login"></Redirect>;
    }
  };

  return (
    <div className={Style.login}>
      {successMessage()}
      {errorMessage()}
      <form>
        <h2>Signup</h2>
        <input
          placeholder="username"
          type="text"
          onChange={handleChange("username")}
          required
          name="username"
        />
        <input
          placeholder="Email"
          type="email"
          onChange={handleChange("email")}
          required
          name="email"
        />
        <input
          placeholder="Password"
          type="password"
          onChange={handleChange("password")}
          required
          name="password"
        />
        <button onClick={onSubmit} type="submit">
          submit
        </button>
      </form>
      {redirect()}
    </div>
  );
};

export default Signup;

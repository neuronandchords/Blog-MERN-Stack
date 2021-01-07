import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../helper/apicalls";
import Style from "./Login.module.css";

const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
    redirect: false,
  });

  const { email, password, error, redirect } = value;
  // const { user } = isAuthenticated();

  const handleChange = (name) => (e) => {
    setValue({ ...value, error: false, [name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setValue({ ...value, error: false });
    signin({ email, password }).then((data) => {
      console.log(data);
      if (data.error) {
        setValue({ ...value, error: data.error });
      } else {
        authenticate(data, () => {
          setValue({ ...value, redirect: true });
        });
      }
    });
  };

  const errorMessage = () => {
    return (
      <div
        style={{
          display: error ? "" : "none",
          width: "100%",
          height: "50px",
          color: "#000",
          textAlign: "center",
          backgroundColor: "red",
        }}
      >
        {error}
      </div>
    );
  };

  const performRedirect = () => {
    if (redirect) {
      if (isAuthenticated()) {
        return <Redirect to="/"></Redirect>;
      }
    }
  };
  return (
    <div className={Style.login}>
      <form>
        <h2>Login</h2>
        {errorMessage()}
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
          Login
        </button>
      </form>
      {performRedirect()}
    </div>
  );
};

export default Login;

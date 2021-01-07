import React from "react";
import { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../../routes/helper/apicalls";
import Style from "./Header.module.css";

const Header = ({ history }) => {
  const loginLogout = () => {
    return isAuthenticated() ? (
      <Fragment>
        <span
          onClick={() => {
            signout(() => {
              history.push("/login");
            });
          }}
          style={{ color: "yellow", cursor: "pointer" }}
        >
          LOGOUT
        </span>
        <Link to="/new/article">Create</Link>
      </Fragment>
    ) : (
      <Fragment>
        <Link to="/login">Login</Link>
        <Link to="/signup">signup</Link>
      </Fragment>
    );
  };

  return (
    <header className={Style.header}>
      <h1>Blog-MERN</h1>
      <nav>
        <Link to="/">ALL BLOGS</Link>
        {loginLogout()}
      </nav>
    </header>
  );
};

export default withRouter(Header);

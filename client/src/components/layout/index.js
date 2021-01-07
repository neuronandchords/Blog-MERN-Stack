import React from "react";
import Header from "../header/index";
import Footer from "../footer/index";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <hr />
      {children}
      <hr />
      <Footer />
    </>
  );
};

export default Layout;

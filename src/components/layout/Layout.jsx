import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "90vh" }}>{children}</div>
      <Footer />
    </>
  );
};

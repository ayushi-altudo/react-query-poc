import React, { Children } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Header />
      {...Children}
      <Footer />
    </>
  );
}

export default Layout;

import React from "react";
import Header from "./Header";
import Movies from "./Movies";
import MainContainer from "./MainContainer";

const Browser = () => {
  return (
    <>
      <Header />
      <div className="">
        <MainContainer />
        {/* <Movies /> */}
      </div>
    </>
  );
};

export default Browser;

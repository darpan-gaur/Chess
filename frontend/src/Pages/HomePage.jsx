import React from "react";
import Navbar from "../Components/Navbar";
import "../App.css"
const HomePage = () => {
  return (
    <div
      style={{
        background: "#202020",
        position:"absolute",
        width:"100%",
        height: "150vh",
        zIndex:0
      }}
    >
      <div style={{zIndex:2,padding:"100px"}}>
        <Navbar />
      </div>
    </div>
  );
};

export default HomePage;

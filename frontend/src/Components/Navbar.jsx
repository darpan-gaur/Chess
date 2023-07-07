import React from "react";
import logo from "../Images/logo.jpeg";
import chessboard from "../Images/Chessboard.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ background: "#191919", borderRadius: "35px" }} className="point" >
      <div className="point" style={{position:"relative",marginRight:0,zIndex:3}}></div>
      <div
        style={{
          color: "#CAA689",
          padding: "10px",
          display: "flex",
          //   flexDirection: "row",
          position:"relative",
          width: "98%",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} style={{ height: "80px", margin: 10 }} alt="" />
          <h1 style={{ margin: 10 }}>Chess</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className="button" style={{ margin: 20 }}>
            Sign Up
          </button>
          <button className="button" style={{ margin: 20 }}>
            Login
          </button>
        </div>
      </div>
      <div
        style={{
          color: "#CAA689",
          padding: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            fontFamily: "serif",
          }}
        >
          <h1 style={{ color: "#C9A488", fontSize: "64px", marginTop: 0 }}>
            TAKE YOUR CHESS GAME TO NEXT LEVEL
          </h1>
          <p style={{ color: "#7B7B7B", fontSize: "24px", marginTop: 0 }}>
            Connect with top ranked chess players from arounf the world and
            learn the secrets to becoming a chess master.
          </p>
          <button className="button" style={{ fontSize: "24px" }}>
            Play Now!
          </button>
        </div>
        <img src={chessboard} alt="" style={{ height: "500px", margin: 10 }} />
      </div>
    </div>
  );
};

export default Navbar;

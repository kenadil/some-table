import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const StartPage = () => {
  return (
    <>
      <Link to="/users">
        <Button type="primary" style={{
            margin: 0,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "1.5rem",   
            height: "75px",
            width: "125px",
        }}>Start!</Button>
      </Link>
    </>
  );
};

export default StartPage;

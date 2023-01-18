import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import "../App.css";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // do nothing
  }, []);

  return (
    <>
      <div className="land-h1">
        <h1>Welcom to my Home Project!</h1>
        <h3>
          On this project you'll be able to see my project which will contain
          FrontEnd and BackEnd along with some more abilities such as using
          API's and more!
        </h3>
      </div>
    </>
  );
};

export default LandingPage;

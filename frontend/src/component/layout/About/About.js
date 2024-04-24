import React from "react";
import "./aboutSection.css";
import { Typography , Avatar , Button } from "@mui/material";
import Me from "../../../images/me2.jpeg"

const About = () => {
 
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
          <img className="me" src={Me} alt="me" />
            <Typography>Jaskaran Singh</Typography>
          
            <span>
              This is a wesbite made by Jaskaran Singh , only with the
              purpose to learn MERN Stack.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
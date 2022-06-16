import React from "react";
import "./carousel.css";
import { Carousel } from "react-bootstrap";
import student from "./../../images/student.jpg";

function Carouselavis() {
  return (
    <div className="background-section-orange" id="avis">
      <Carousel>
        <Carousel.Item>
          {/* <img className="d-block w-100" src={student} alt="First slide" /> */}
          <Carousel.Caption>
            <h3>" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue mollis interdum."</h3>
            <p>-Pierre</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {/* <img className="d-block w-100" src={student} alt="Second slide" /> */}

          <Carousel.Caption>
            <h3>" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum."</h3>
            <p>-Paul</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {/* <img className="d-block w-100" src={student} alt="Third slide" /> */}

          <Carousel.Caption>
            <h3>" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum"</h3>
            <p>-Jacques</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carouselavis;

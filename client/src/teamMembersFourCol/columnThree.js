import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { ResizeSensor } from "@amcharts/amcharts4/.internal/core/utils/ResizeSensor";

const FourColumnThree = (props) => {

    let element = "";
    let elementArr = [];
    let count = 5;
    let fillColor = "hsl(215, 40%, 18%)";
    let columnArr = props.colArr;
    columnArr.forEach((item) => {
      console.log(item);
      element = (
        <Card className={"teamMembers-card"+count}>
                            <Card.Body>
                              <svg
                                id={"card-icon"+count}
                                xmlns="http://www.w3.org/2000/svg"
                                width="77"
                                height="78"
                                fill={fillColor}
                                className="bi bi-person-circle"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                />
                              </svg>
                              <Card.Title className={"card-title"+count}>{item["name"]}</Card.Title>
                              <Card.Text className={"card-text"+count}>
                                {item["github_username"]}
                              </Card.Text>
                              <Card.Text className={"card-subtext"+count}>
                                {item["course"]}
                              </Card.Text>
                              <Button className={"card-button"+count}>Details</Button>
                            </Card.Body>
        </Card> 
      );
      elementArr.push(element);
      if(count == 5){
        count = 6;
        fillColor="#EDAE49";
      }else{
        count = 5;
        fillColor ="hsl(215, 40%, 18%)"
      }
    });
    return elementArr;
    
}

export default FourColumnThree
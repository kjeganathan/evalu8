import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./teamMembers.css";
import logo from "./logo.png";
import { ResizeSensor } from "@amcharts/amcharts4/.internal/core/utils/ResizeSensor";
import ColumnOne from "./teamMembersFiveCol/columnOne";
import FiveColumnOne from "./teamMembersFiveCol/columnOne";
import FiveColumnTwo from "./teamMembersFiveCol/columnTwo";
import FiveColumnThree from "./teamMembersFiveCol/columnThree";
import FiveColumnFour from "./teamMembersFiveCol/columnFour";
import FiveColumnFive from "./teamMembersFiveCol/columnFive";

const TeamMembersFiveCol = (props) => {
  let numTeamMembers = props.count;
  let teamMemberArr = props.teamMembers;
  let countFiveColOne = 0;
  let countFiveColTwo = 0;
  let countFiveColThree = 0;
  let countFiveColFour = 0;
  let countFiveColFive = 0;
  let colOneArr = [];
  let colTwoArr = [];
  let colThreeArr = [];
  let colFourArr = [];
  let colFiveArr = [];
  console.log("counter" + numTeamMembers);
  console.log("team " + JSON.stringify(teamMemberArr));

  //Calculating number of cards in each column
  if (numTeamMembers % 5 == 0 && teamMemberArr.length != 0) {
    let numCards = numTeamMembers / 5;
    countFiveColOne = numCards;
    countFiveColTwo = numCards;
    countFiveColThree = numCards;
    countFiveColFour = numCards;
    countFiveColFive = numCards;
  } else if (numTeamMembers % 5 == 3 && teamMemberArr.length != 0) {
    let numCards = Math.floor(numTeamMembers / 5);
    countFiveColOne = numCards;
    countFiveColTwo = numCards + 1;
    countFiveColThree = numCards + 1;
    countFiveColFour = numCards + 1;
    countFiveColFive = numCards;
  } else if (numTeamMembers % 5 == 1 && teamMemberArr.length != 0) {
    let numCards = Math.floor(numTeamMembers / 5);
    countFiveColOne = numCards;
    countFiveColTwo = numCards;
    countFiveColThree = numCards + 1;
    countFiveColFour = numCards;
    countFiveColFive = numCards;
  } else if (numTeamMembers % 3 == 0 && teamMemberArr.length != 0) {
    let numCards = numTeamMembers / 3;
    countFiveColOne = 0;
    countFiveColTwo = numCards;
    countFiveColThree = numCards;
    countFiveColFour = numCards;
    countFiveColFive = 0;
  } else if (numTeamMembers % 3 == 1 && teamMemberArr.length != 0) {
    let numCards = Math.floor(numTeamMembers / 3);
    countFiveColOne = 0;
    countFiveColTwo = numCards;
    countFiveColThree = numCards + 1;
    countFiveColFour = numCards;
    countFiveColFive = 0;
  } else if (numTeamMembers == 2 && teamMemberArr.length != 0) {
    countFiveColOne = 0;
    countFiveColTwo = 0;
    countFiveColThree = 2;
    countFiveColFour = 0;
    countFiveColFive = 0;
  } else if (numTeamMembers == 1 && teamMemberArr.length != 0) {
    countFiveColOne = 0;
    countFiveColTwo = 0;
    countFiveColThree = 1;
    countFiveColFour = 0;
    countFiveColFive = 0;
  }

  let copiedArr = teamMemberArr;
  for (let i = 0; i < countFiveColOne; i++) {
    let popped = copiedArr.pop();
    colOneArr.push(popped); //pushes popped elements into the array
  }
  for (let i = 0; i < countFiveColTwo; i++) {
    let popped = copiedArr.pop();
    colTwoArr.push(popped); //pushes popped elements into the array
  }
  for (let i = 0; i < countFiveColThree; i++) {
    let popped = copiedArr.pop();
    colThreeArr.push(popped); //pushes popped elements into the array
  }
  for (let i = 0; i < countFiveColFour; i++) {
    let popped = copiedArr.pop();
    colFourArr.push(popped); //pushes popped elements into the array
  }
  for (let i = 0; i < countFiveColFive; i++) {
    let popped = copiedArr.pop();
    colFiveArr.push(popped); //pushes popped elements into the array
  }

  return (
    <div className="row">
      {/* Column 1 */}
      <div id="column" className="col-sm">
        <FiveColumnOne colArr={colOneArr}></FiveColumnOne>
        {/* <ColumnOne cardColOne={}></ColumnOne> */}
        {/* <Card className="teamMembers-card1">
                                <Card.Body>
                                  <svg
                                    id="card-icon1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="77"
                                    height="78"
                                    fill="hsl(215, 40%, 18%)"
                                    className="bi bi-person-circle"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path
                                      fill-rule="evenodd"
                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                    />
                                  </svg>
                                  <Card.Title className="card-title1">Jane Dore</Card.Title>
                                  <Card.Text className="card-text1">
                                    Frontend Developer
                                  </Card.Text>
                                  <Card.Text className="card-subtext1">
                                    jdore@gmail.com
                                  </Card.Text>
                                  <Button className="card-button1">Details</Button>
                                </Card.Body>
                              </Card> */}

        {/* <Card className="teamMembers-card2">
                                <Card.Body>
                                  <svg
                                    id="card-icon2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="77"
                                    height="78"
                                    fill="#00798C"
                                    className="bi bi-person-circle"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path
                                      fill-rule="evenodd"
                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                    />
                                  </svg>
                                  <Card.Title className="card-title2">Naomi Reid</Card.Title>
                                  <Card.Text className="card-text2">
                                    Backend Developer
                                  </Card.Text>
                                  <Card.Text className="card-subtext2">
                                    nreid@gmail.com
                                  </Card.Text>
                                  <Button className="card-button2">Details</Button>
                                </Card.Body>
                              </Card> */}
      </div>

      {/* Column 2 */}
      <div id="column" className="col-sm">
        <FiveColumnTwo colArr={colTwoArr}></FiveColumnTwo>
        {/* <Card className="teamMembers-card3">
          <Card.Body>
            <svg
              id="card-icon3"
              xmlns="http://www.w3.org/2000/svg"
              width="77"
              height="78"
              fill="#A53860"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            <Card.Title className="card-title3">Josh Hase</Card.Title>
            <Card.Text className="card-text3">Backend Developer</Card.Text>
            <Card.Text className="card-subtext3">jhase@gmail.com</Card.Text>
            <Button className="card-button3">Details</Button>
          </Card.Body>
        </Card> */}

        {/* <Card className="teamMembers-card4">
          <Card.Body>
            <svg
              id="card-icon4"
              xmlns="http://www.w3.org/2000/svg"
              width="77"
              height="78"
              fill="hsl(215, 40%, 18%)"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            <Card.Title className="card-title4">Eric Anderson</Card.Title>
            <Card.Text className="card-text4">Database Developer</Card.Text>
            <Card.Text className="card-subtext4">eanderson@gmail.com</Card.Text>
            <Button className="card-button4">Details</Button>
          </Card.Body>
        </Card> */}
      </div>

      {/* Column 3 */}
      <div id="column" className="col-sm">
        <FiveColumnThree colArr={colThreeArr}></FiveColumnThree>
        {/* <Card className="teamMembers-card5">
          <Card.Body>
            <svg
              id="card-icon5"
              xmlns="http://www.w3.org/2000/svg"
              width="77"
              height="78"
              fill="hsl(215, 40%, 18%)"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            <Card.Title className="card-title5">Derek Hawks</Card.Title>
            <Card.Text className="card-text5">Frontend Developer</Card.Text>
            <Card.Text className="card-subtext5">dhawks@gmail.com</Card.Text>
            <Button className="card-button5">Details</Button>
          </Card.Body>
        </Card> */}

        {/* <Card className="teamMembers-card6">
          <Card.Body>
            <svg
              id="card-icon6"
              xmlns="http://www.w3.org/2000/svg"
              width="77"
              height="78"
              fill="#EDAE49"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            <Card.Title className="card-title6">Dayton Peerson</Card.Title>
            <Card.Text className="card-text6">Frontend Developer</Card.Text>
            <Card.Text className="card-subtext6">dpeerson@gmail.com</Card.Text>
            <Button className="card-button6">Details</Button>
          </Card.Body>
        </Card> */}
      </div>

      {/* Column 4 */}
      <div id="column" className="col-sm">
        <FiveColumnFour colArr={colFourArr}></FiveColumnFour>
        {/* <Card className="teamMembers-card7">
          <Card.Body>
            <svg
              id="card-icon7"
              xmlns="http://www.w3.org/2000/svg"
              width="77"
              height="78"
              fill="#00798C"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            <Card.Title className="card-title7">Rayne Masters</Card.Title>
            <Card.Text className="card-text7">Database Developer</Card.Text>
            <Card.Text className="card-subtext7">rmasters@gmail.com</Card.Text>
            <Button className="card-button7">Details</Button>
          </Card.Body>
        </Card> */}

        {/* <Card className="teamMembers-card8">
          <Card.Body>
            <svg
              id="card-icon8"
              xmlns="http://www.w3.org/2000/svg"
              width="77"
              height="78"
              fill="hsl(215, 40%, 18%)"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            <Card.Title className="card-title8">Lucy Lu</Card.Title>
            <Card.Text className="card-text8">Backend Developer</Card.Text>
            <Card.Text className="card-subtext8">llu@gmail.com</Card.Text>
            <Button className="card-button8">Details</Button>
          </Card.Body>
        </Card> */}
      </div>

      {/* Column 5 */}
      <div id="column" className="col-sm">
        <FiveColumnFive colArr={colFiveArr}></FiveColumnFive>
        {/* <Card className="teamMembers-card9">
          <Card.Body>
            <svg
              id="card-icon9"
              xmlns="http://www.w3.org/2000/svg"
              width="77"
              height="78"
              fill="hsl(215, 40%, 18%)"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            <Card.Title className="card-title9">Tez Martinez</Card.Title>
            <Card.Text className="card-text9">Database Developer</Card.Text>
            <Card.Text className="card-subtext9">tmartinez@gmail.com</Card.Text>
            <Button className="card-button9">Details</Button>
          </Card.Body>
        </Card> */}

        {/* <Card className="teamMembers-card10">
          <Card.Body>
            <svg
              id="card-icon10"
              xmlns="http://www.w3.org/2000/svg"
              width="77"
              height="78"
              fill="#A53860"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            <Card.Title className="card-title10">Jackie Lester</Card.Title>
            <Card.Text className="card-text10">Backend Developer</Card.Text>
            <Card.Text className="card-subtext10">jlester@gmail.com</Card.Text>
            <Button className="card-button10">Details</Button>
          </Card.Body>
        </Card> */}
      </div>
    </div>
  );
};
export default TeamMembersFiveCol;

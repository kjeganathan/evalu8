import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./teamMembers.css";
import logo from "./logo.png";

class teamMembers extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="teamMembersPage">
          <div className="teamMembers-header">
            <div className="container">
              <div className="row">
                {/* Column 1 */}
                <div className="col-sm">
                  <Card className="teamMembers-card1">
                    <Card.Body>
                      <svg
                        id="card-icon1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="77"
                        height="78"
                        fill="white"
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
                  </Card>

                  <Card className="teamMembers-card2">
                    <Card.Body>
                      <svg
                        id="card-icon2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="77"
                        height="78"
                        fill="#028FA3"
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
                  </Card>

                  
                </div>

                {/* Column 2 */}
                <div className="col-sm">
                  <Card className="teamMembers-card3">
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
                      <Card.Text className="card-text3">
                        Backend Developer
                      </Card.Text>
                      <Card.Text className="card-subtext3">
                        jhase@gmail.com
                      </Card.Text>
                      <Button className="card-button3">Details</Button>
                    </Card.Body>
                  </Card>

                  <Card className="teamMembers-card4">
                    <Card.Body>
                      <svg
                        id="card-icon4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="77"
                        height="78"
                        fill="white"
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
                      <Card.Text className="card-text4">
                        Database Developer
                      </Card.Text>
                      <Card.Text className="card-subtext4">
                        eanderson@gmail.com
                      </Card.Text>
                      <Button className="card-button4">Details</Button>
                    </Card.Body>
                  </Card>
                </div>

                {/* Column 3 */}
                <div className="col-sm">
                  
                  <Card className="teamMembers-card5">
                    <Card.Body>
                      <svg
                        id="card-icon5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="77"
                        height="78"
                        fill="white"
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
                      <Card.Text className="card-text5">
                        Frontend Developer
                      </Card.Text>
                      <Card.Text className="card-subtext5">
                        dhawks@gmail.com
                      </Card.Text>
                      <Button className="card-button5">Details</Button>
                    </Card.Body>
                  </Card>

                  <Card className="teamMembers-card6">
                    <Card.Body>
                      <svg
                        id="card-icon6"
                        xmlns="http://www.w3.org/2000/svg"
                        width="77"
                        height="78"
                        fill="#014161"
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
                      <Card.Text className="card-text6">
                        Frontend Developer
                      </Card.Text>
                      <Card.Text className="card-subtext6">
                        dpeerson@gmail.com
                      </Card.Text>
                      <Button className="card-button6">Details</Button>
                    </Card.Body>
                  </Card>
                </div>

                {/* Column 4 */}
                <div className="col-sm">
                  <Card className="teamMembers-card7">
                    <Card.Body>
                      <svg
                        id="card-icon7"
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
                      <Card.Title className="card-title7">Rayne Masters</Card.Title>
                      <Card.Text className="card-text7">
                        Database Developer
                      </Card.Text>
                      <Card.Text className="card-subtext7">
                        rmasters@gmail.com
                      </Card.Text>
                      <Button className="card-button7">Details</Button>
                    </Card.Body>
                  </Card>

                  <Card className="teamMembers-card8">
                    <Card.Body>
                      <svg
                        id="card-icon8"
                        xmlns="http://www.w3.org/2000/svg"
                        width="77"
                        height="78"
                        fill="white"
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
                      <Card.Text className="card-text8">
                        Backend Developer
                      </Card.Text>
                      <Card.Text className="card-subtext8">
                        llu@gmail.com
                      </Card.Text>
                      <Button className="card-button8">Details</Button>
                    </Card.Body>
                  </Card>
                </div>

                {/* Column 5 */}
                <div className="col-sm">
                <Card className="teamMembers-card9">
                    <Card.Body>
                      <svg
                        id="card-icon9"
                        xmlns="http://www.w3.org/2000/svg"
                        width="77"
                        height="78"
                        fill="white"
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
                      <Card.Text className="card-text9">
                        Database Developer
                      </Card.Text>
                      <Card.Text className="card-subtext9">
                        tmartinez@gmail.com
                      </Card.Text>
                      <Button className="card-button9">Details</Button>
                    </Card.Body>
                  </Card>

                  <Card className="teamMembers-card10">
                    <Card.Body>
                      <svg
                        id="card-icon10"
                        xmlns="http://www.w3.org/2000/svg"
                        width="77"
                        height="78"
                        fill="#028FA3"
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
                      <Card.Text className="card-text10">
                        Backend Developer
                      </Card.Text>
                      <Card.Text className="card-subtext10">
                        jlester@gmail.com
                      </Card.Text>
                      <Button className="card-button10">Details</Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default teamMembers;

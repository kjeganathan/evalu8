import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homePage.css";
import logo from "./logo.png";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

class homePage extends Component {
  constructor() {
    super();
    this.state = {
      homePageModalShow: false,
    };
  }

  handleShow = () => {
    this.setState({ homePageModalShow: true });
  };

  handleClose = () => {
    this.setState({ homePageModalShow: false });
  };

  routeChangeToCreateAccount = () => {
    this.props.history.push("/createAccount");
  };

  routeChangeToLogin = () => {
    this.props.history.push("/login");
  };

  routeChangeToAdminLogin = () => {
    this.props.history.push("/adminLogin");
  };

  routeChangeToAdminCreateAccount = () => {
    this.props.history.push("/adminCreateAccount");
  };

  routeChangeToStudentCreateAccount = () => {
    this.props.history.push("/createAccount");
  };

  render() {
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button
            id="homePage-header-admin-button-id"
            onClick={this.routeChangeToAdminLogin}
            type="submit"
            className="btn btn-dark"
          >
            Admin Log In
          </button>
          <button
            id="homePage-header-button-id"
            onClick={this.routeChangeToLogin}
            type="submit"
            className="btn btn-dark"
          >
            Student Log In
          </button>
        </div>
        <div className="homePage">
          <h1 className="homePage-header">Performance evaluation made easy</h1>
          <h2 className="homePage-body">
            Evalu8 is a performance evaluation tool for students <br /> in a
            classroom setting
          </h2>
          <div className="homePage-button">
            <>
              <Button
                id="homePage-button-id"
                onClick={this.handleShow}
                type="submit"
                className="btn btn-dark"
              >
                Sign Up
              </Button>
              <Modal
                show={this.state.homePageModalShow}
                onHide={this.handleClose}
                backdrop="static"
                keyboard={false}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="homepageModal"
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="currentColor"
                      class="bi bi-person-plus-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      <path
                        fill-rule="evenodd"
                        d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                      />
                    </svg>
                    &nbsp;
                    Sign Up
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <center>
                    <br />
                    <Button
                      className="btn btn-dark"
                      id="professor-signup"
                      onClick={this.routeChangeToAdminCreateAccount}
                    >
                      I am a Professor
                    </Button>
                    &nbsp; &nbsp; &nbsp;
                    <Link to="/adminCreateAccount" />
                    &nbsp;
                    <Button
                      className="btn btn-dark"
                      id="student-signup"
                      onClick={this.routeChangeToStudentCreateAccount}
                    >
                      I am a Student
                    </Button>
                    <br />
                    <br />
                  </center>
                </Modal.Body>
              </Modal>
            </>
          </div>
        </div>
      </div>
    );
  }
}

export default homePage;

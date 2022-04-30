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
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Are you a:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                <Button variant="secondary" onClick={this.routeChangeToAdminCreateAccount}>
                    Professor
                  </Button>
                  <Link to="/adminCreateAccount"/>
                  &nbsp; OR &nbsp;
                  <Button variant="primary" onClick={this.routeChangeToStudentCreateAccount}>Student</Button>
                  
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

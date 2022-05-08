import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./Login.css";
import logo from "./logo.png";

class adminLogin extends Component {
  constructor() {
    super();

    this.state = {
      course: "",
      dropDownVal: "",
      professorArr:[]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = async () => {
    //get all the dropdown item names from the admin db
    console.log("value Of professor:" + this.state.value);
    await fetch("/api/getAllAdmins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      let resp = await response.json();
      // the response is the ischecked value
      let newArr = [];
      let index = 0;
      resp.forEach((item) => {
        console.log(JSON.stringify(item["name"]));
        newArr.push({ id: index, name: item["name"] });
        index++;
      });
      // console.log("respadmins:" + JSON.stringify(resp));
      this.setState({
        professorArr: newArr,
        dropDownVal: newArr[0]["name"],
      });

      console.log("val:" + this.state.dropDownVal);
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleDropDownChange = (e) => {
    let newValue = e.target.value;
    console.log("eventTargetVal:" + e.target.value);
    console.log("dropDownValBe4:" + this.state.dropDownVal);
    this.state.dropDownVal = newValue;
    // this.setState({
    //   dropDownVal: newValue
    // })
    console.log("dropDownVal:" + this.state.dropDownVal);
  };

  handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("username", JSON.stringify(this.state.dropDownVal));
    localStorage.setItem("course", JSON.stringify(this.state.course));
    window.location.href = "/adminPage";
  }

  render() {
    const professors = this.state.professorArr;

    let professorList = professors.length > 0 && professors.map((item, i) => {
      console.log("i:", i + " " + JSON.stringify(item));
      return (
        <option key={i} value={item.name}>{item.name}</option>
      )
    }, this);
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="Login">
          {/* Login Form */}
          <div id="loginForm" className="col-sm border-right">
            <div id="login-form-modal">
              <form onSubmit={this.handleSubmit}>
                <h1 className="Login-header">Welcome Back</h1>
                <h4 className="Login-subheader">Login to continue</h4>

                <div id="last-name-form" className="form-group">
                  <label for="adminName">
                    Name
                    <select id="adminName" onChange={this.handleDropDownChange}>
                      {professorList}
                    </select>
                  </label>
                </div>
                <div id="courseForm" className="form-group">
                  <label for="loginCourse">Course (ex. COMPSCI 326)</label>
                  <input
                    onChange={this.handleChange}
                    name="course"
                    type="text"
                    className="form-control"
                    id="loginCourse"
                  />
                </div>
                {/* <div id="passwordForm" className="form-group">
                  <label for="loginPassword">Password</label>
                  <input
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    className="form-control"
                    id="loginPassword"
                  />
                </div> */}
                <div className="loginButton">
                  <button
                    id="loginButton"
                    type="submit"
                    className="btn btn-dark"
                  >
                    Login
                  </button>
                </div>
                <div id="option-id" className="option">
                  Don't have an account? &nbsp;
                  <a
                    href="./adminCreateAccount"
                    id="create-account-link-id"
                    className="createAccountLink"
                  >
                    sign up
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default adminLogin;

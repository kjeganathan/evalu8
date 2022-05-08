import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./createAccount.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";

class createAccount extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      github_username: "",
      github_reponame: "",
      github_token: "",
      password: "",
      classroom: "",
      teamMemberArr: [],
      professorArr: [],
      dropDownVal:''
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
        console.log(JSON.stringify(item['name']));
        newArr.push({id: index, name: item['name']})
        index++;
      });
      // console.log("respadmins:" + JSON.stringify(resp));
      this.setState({
        professorArr: newArr,
        dropDownVal: newArr[0]['name']
      });

      console.log("val:" + this.state.dropDownVal);

      

    })

    
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleDropDownChange = (e) => {
    let newValue = e.target.value;
    console.log("eventTargetVal:" + e.target.value);
    console.log("dropDownValBe4:"+this.state.dropDownVal);
    this.state.dropDownVal = newValue;
    // this.setState({
    //   dropDownVal: newValue
    // })
    console.log("dropDownVal:"+this.state.dropDownVal);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.state.name,
      classroom: this.state.classroom,
      github_username: this.state.github_username,
      github_reponame: this.state.github_reponame,
      github_token: this.state.github_token,
      password: this.state.password,
      admin:this.state.dropDownVal
    };
    
    let token = this.state.github_token;
    //Fetch request to create an account for a new manager
    fetch("/api/createAccount", {
      method: "POST",
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("Success:", response);
        let owner = data.github_username;
        let reponame = data.github_reponame;
        console.log(owner);
        console.log(reponame);
        fetch(`/gitapi/github/teamInfo/${owner}/${reponame}/${token}`).then(
          async (responsenext) => {
            try {
              //data2 is an array of objects
              const data2 = await responsenext.json();
              console.log("response data?", data2);
              // let dataLength = data2.length;
              let newState = [];
              data2.forEach((obj) => {
                if (data.github_username != obj["login"]) {
                  console.log(obj["login"]);
                  newState.push(obj["login"]);
                  fetch(
                    `/gitapi/github/userInfo/${obj["login"]}/${token}`
                  ).then(async (responsethird) => {
                    const data3 = await responsethird.json();
                    console.log("response data3!", data3);
                    console.log("data3name:" + data3["name"]);
                    let teammember_table_data = {
                      name: data3["name"],
                      course: this.state.classroom,
                      github_username: obj["login"],
                      manager_name: this.state.github_username,
                      email: data3["email"],
                      admin: this.state.dropDownVal
                    };
                    fetch("/api/addToTeamMemberTable", {
                      method: "POST",
                      body: JSON.stringify(teammember_table_data), // data can be `string` or {object}!
                      headers: { "Content-Type": "application/json" },
                    });
                  });
                }
              });
              console.log(newState);
              let teamMemberData = {
                github_username: this.state.github_username,
                github_reponame: this.state.github_reponame,
                team_members: newState,
              };
              fetch("/api/addTeamMembers", {
                method: "POST",
                body: JSON.stringify(teamMemberData), // data can be `string` or {object}!
                headers: { "Content-Type": "application/json" },
              });
            } catch (error) {
              console.log("Error happened here");
              console.log(error);
            }
          }
        );
      });
    console.log(this.state.teamMemberArr);
    window.alert("You successfully created a new account!  Now, go ahead and log in!");
    <Link to="/login" />;
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
        <div className="createAccount">
          <div id="loginForm" className="col-sm border-right">
            <div id="createAccount-form-modal">
              <form onSubmit={this.handleSubmit}>
                <h1 className="createAccount-header">Create Your Account</h1>
                <h4 className="createAccount-subheader">
                  Create an account to use Evalu8
                </h4>
                <div id="first-name-form" className="form-group">
                  <label for="createFirstName">Name</label>
                  <input
                    onChange={this.handleChange}
                    name="name"
                    type="text"
                    className="form-control"
                    id="createFirstName"
                  />
                </div>
                <div id="last-name-form" className="form-group">
                  <label for="classRoomName">Course (ex. COMPSCI 326)</label>
                  <input
                    onChange={this.handleChange}
                    name="classroom"
                    type="text"
                    className="form-control"
                    id="classRoomName"
                  />
                </div>
                <div id="last-name-form" className="form-group">
                  <label for="adminName">
                      Course Professor
                      <br/>
                    <select
                      onChange={this.handleDropDownChange}
                      id="adminName"
                    >
                    
                     {professorList}
                      
                    </select>
                  </label>
                </div>
                <div id="last-name-form" className="form-group">
                  <label for="createLastName">Github Username</label>
                  <input
                    onChange={this.handleChange}
                    name="github_username"
                    type="text"
                    className="form-control"
                    id="createLastName"
                  />
                </div>
                <div id="last-name-form" className="form-group">
                  <label for="reponame">Github Repo Name</label>
                  <input
                    onChange={this.handleChange}
                    name="github_reponame"
                    type="text"
                    className="form-control"
                    id="reponame"
                  />
                </div>
                <div id="email-form" className="form-group">
                  <label for="createEmail">Github Token</label>
                  <input
                    onChange={this.handleChange}
                    name="github_token"
                    type="text"
                    className="form-control"
                    id="createEmail"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div id="password-form" className="form-group">
                  <label for="createPassword">Password</label>
                  <input
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    className="form-control"
                    id="createPassword"
                  />
                </div>
                {/* <div id="verify-password-form" className="form-group">
                  <label for="createVerifyPassword">Verify Password</label>
                  <input
                    onChange={this.handleChange}
                    name="verifypassword"
                    type="password"
                    className="form-control"
                    id="createVerifyPassword"
                  />
                </div> */}
                <div className="createAccountButton">
                  <button
                    id="createAccountButton"
                    type="submit"
                    className="btn btn-dark"
                  >
                    Create Account
                  </button>
                </div>
                <div id="createAccount-option-id" className="option">
                  Already have an account? &nbsp;
                  <a
                    href="./login"
                    id="loginLink-id"
                    className="loginLink"
                  >
                    log in
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

export default createAccount;

import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './createAccount.css';
 
class createAccount extends Component {

    // createNewAccount() {
    //   let firstName = document.getElementById('createFirstName');
    //   let lastName = document.getElementById('createLastName');
    //   let email = document.getElementById('createEmail');
    //   let password = document.getElementById('createPassword');

    //   let managerObj = {
    //       firstName: firstName,
    //       lastName: lastName,
    //       email: email,
    //       password: password
    //   };

    //     const baseURL = "http://localhost:8080/api/getAllManagers";
    //     axios.post("/api/getPost", {
    //             firstName: "Sandra",
    //             lastName: "Peterson",
    //             email: "sp@gmail.com",
    //             password: "sp123"
    //         }
    //         ).then((response) => {
    //                 console.log(response.data);
    //     });


    //}



    render() {
      return (
        
        <div className="createAccount">
            <h1 className="createAccount-header">Create Account</h1>
            <div id="loginForm" className="col-sm border-right">
                    <form>
                        <div className="form-group">
                          <input type="text" className="form-control" id="createFirstName" placeholder="First Name"/>
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" id="createLastName" placeholder="Last Name"/>
                        </div>
                        <div className="form-group">
                          <input type="email" className="form-control" id="createEmail" aria-describedby="emailHelp" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="createPassword" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="createVerifyPassword" placeholder="Verify Password"/>
                        </div>
                        <div className="createAccountButton">
                          <button id="createAccountButton" type="submit" className="btn btn-dark">Create Account</button>
                        </div>
                          <div className="option">Already have an account? &nbsp;
                          <a href="http://localhost:3000/login" className="createAccountLink">log in</a>
                          </div>
                         
                 
                    </form>
                </div>
        </div>
        
      );
    }
  }
  
  export default createAccount;
 

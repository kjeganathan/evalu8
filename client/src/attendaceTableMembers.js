import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useRef } from "react";
import React, { Component } from "react";

let checkPresent = false;
let checkAbsent = false;
let checkExcused = false;
let checkedObj = {present:false, absent:false, excused:false};

const AttendanceTableMember = (props) => {

    //we can push the data with check status, date and team member to the db onchange 
    // in other words we push check status based on db and team member, if date already exists, then we modify already existant date otherwise we create a new row
    
    let count = 1;
    let coursedata = JSON.parse(localStorage.getItem('course'));
    
    const handlePresentClick = (event) => {
        let checked = event.target.checked;
        console.log(checked);  

        let checkedValue = event.target.value;
        console.log(checkedValue);

        let checkedInfo = event.target.id;
        console.log("checkedInfo: " + checkedInfo); //Send checkedInfo To Parent

        props.sendData(checkedInfo);

    }

    const handleAbsentClick = (event) => {
        let checked = event.target.checked;
        console.log(checked);

        let checkedValue = event.target.value;
        console.log(checkedValue);

        let checkedInfo = event.target.id;
        console.log(checkedInfo); //Send checkedInfo To Parent
        console.log("checkedInfo: " + checkedInfo);
        props.sendData(checkedInfo);

    }

    const handleExcusedClick = (event) => {
        let checked = event.target.checked;
        console.log(checked);

        let checkedValue = event.target.value;
        console.log(checkedValue);

        let checkedInfo = event.target.id;
        console.log(checkedInfo); //Send checkedInfo To Parent
        console.log("checkedInfo: " + checkedInfo);
        props.sendData(checkedInfo);

    }

    const assignChecked = async (data) => {
      
        await fetch('/api/statusAttendanceByDate',{ 
            method:'POST', 
            body: JSON.stringify(data), 
            headers:{ 'Content-Type': 'application/json' } 
          }).then((response) => response.json())
          .then(async (responseJSON) => {
            console.log(responseJSON.length); //this is the result
            if(responseJSON.length !== 0){
                if(responseJSON[0]['status'] === "excused"){
                    checkExcused = true;
                    
                  }
                  if(responseJSON[0]['status'] === "present"){
                    checkedObj.present = true;
                    
                  }
                  if(responseJSON[0]['status'] === "absent"){
                    checkAbsent = true;
                    
                  }
                }   
                
            console.log(checkedObj['present']);
          })
          .catch((error) => {
            console.log("reset client error-------",error);
       });
    }
    
    const getTeamMembers = async () => {

      let jsoncourse = JSON.parse(localStorage.getItem('course'));
      let github_username = JSON.parse(localStorage.getItem('github_username'));

      await fetch('/api/getAllTeamMembersByManagerAndCourse',{ 
        method:'POST', 
        body: JSON.stringify({manager_name:github_username, course:jsoncourse}), 
        headers:{ 'Content-Type': 'application/json' } 
      }).then(async (response) => 
      {
        let resp = await response.json();
        console.log(resp);
        
        let team_github_username_arr = [];
        let team_member_arr = [];
        // response.json();
        resp.forEach((item) => {
          team_member_arr.push(item);
          team_github_username_arr.push(item['github_username']);
        })
        localStorage.setItem('team_member_arr', JSON.stringify(team_member_arr))
      });
    }
    
    let member = "";
    let memberArr = [];
    //get teamMembers from the db
    
    getTeamMembers();

    let teamMembers = JSON.parse(localStorage.getItem('team_member_arr'));
    if(teamMembers.length != 0){
    teamMembers.forEach(async (teamMember) => {
        console.log("tem" + teamMember);
        let data = {teammemberinfo:teamMember['github_username'], date:props.data, course:coursedata};
        // let returnedData = assignChecked(data);
        let res = assignChecked(data);
        console.log(JSON.stringify(res));
        // console.log("returned" + JSON.stringify(returnedData));
        // console.log("checkArr" + checkedArr);
        // console.log("checkedObj" + (checkedObj[]));
        let value = props.checkPresent;
        console.log(value);
        console.log(JSON.stringify(checkedObj));
        
        member = (
            <tr>
              <td>{count}</td>
              <td>{teamMember['github_username']}</td> 
              <td>{teamMember['course']}</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        // checked={checkPresent}
                        onChange={handlePresentClick}
                        checkedName="Present"
                        label="Present"
                        name="group1"
                        type={type}
                        id={"present," + teamMember['github_username'] + "," + props.data + "," + teamMember['name']}
                      />
                      <Form.Check
                        inline
                        // checked={checkAbsent}
                        onChange={handleAbsentClick}
                        label="Absent"
                        name="group1"
                        id={"absent," + teamMember['github_username'] + "," + props.data  + "," + teamMember['name']}
                        type={type}
                      />
                      <Form.Check
                        inline
                        // checked={checkExcused}
                        onChange={handleExcusedClick}
                        label="Excused"
                        name="group1"
                        id={"excused," + teamMember['github_username'] + "," + props.data  + "," + teamMember['name']}
                        type={type}
                        // id={`inline-${type}-3`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
        );
        //isPresent = true; (based on checked status)
        //isAbsent = false;
        //isExcused = false;
        memberArr.push(member);
        count++;
    });
    console.log(memberArr);
    return (memberArr);
  }
}

export default AttendanceTableMember;
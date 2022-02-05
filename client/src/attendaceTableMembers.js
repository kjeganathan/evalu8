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
   
    
    const handlePresentClick = (event) => {
        let checked = event.target.checked;
        console.log(checked);  

        let checkedValue = event.target.value;
        console.log(checkedValue);

        let checkedInfo = event.target.id;
        console.log(checkedInfo); //Send checkedInfo To Parent

        props.sendData(checkedInfo);

    }

    const handleAbsentClick = (event) => {
        let checked = event.target.checked;
        console.log(checked);

        let checkedValue = event.target.value;
        console.log(checkedValue);

        let checkedInfo = event.target.id;
        console.log(checkedInfo); //Send checkedInfo To Parent

        props.sendData(checkedInfo);

    }

    const handleExcusedClick = (event) => {
        let checked = event.target.checked;
        console.log(checked);

        let checkedValue = event.target.value;
        console.log(checkedValue);

        let checkedInfo = event.target.id;
        console.log(checkedInfo); //Send checkedInfo To Parent

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
    
    
    let member = "";
    let memberArr = [];
    let teamMembers = ["Jane Dore", "Josh Hase", "Derek Hawks", "Rayne Masters", "Tez Martinez",
"Naomi Reid", "Eric Anderson", "Dayton Peerson", "Lucy Lu", "Jackie Lester"];
    teamMembers.forEach(async (teamMember) => {
        let data = {teammemberinfo:teamMember, date:props.data};
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
              <td>{teamMember}</td> 
              <td>{teamMember + "@gmail.com"}</td>
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
                        id={"present," + teamMember + "," + props.data}
                      />
                      <Form.Check
                        inline
                        // checked={checkAbsent}
                        onChange={handleAbsentClick}
                        label="Absent"
                        name="group1"
                        id={"absent," + teamMember + "," + props.data}
                        type={type}
                      />
                      <Form.Check
                        inline
                        // checked={checkExcused}
                        onChange={handleExcusedClick}
                        label="Excused"
                        name="group1"
                        id={"excused," + teamMember + "," + props.data}
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

export default AttendanceTableMember;
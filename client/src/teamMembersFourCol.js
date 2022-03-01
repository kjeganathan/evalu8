import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./teamMembers.css";
import logo from "./logo.png";
import { ResizeSensor } from "@amcharts/amcharts4/.internal/core/utils/ResizeSensor";
import FourColumnOne from "./teamMembersFourCol/columnOne";
import FourColumnTwo from "./teamMembersFourCol/columnTwo";
import FourColumnThree from "./teamMembersFourCol/columnThree";
import FourColumnFour from "./teamMembersFourCol/columnFour";

const TeamMembersFourCol = (props) => {
    let numTeamMembers = props.count;
    let teamMemberArr = props.teamMembers;
    let countFourColOne = 0;
    let countFourColTwo = 0;
    let countFourColThree = 0;
    let countFourColFour = 0;
    let colOneArr = [];
    let colTwoArr = [];
    let colThreeArr = [];
    let colFourArr = [];
    console.log("counter" + numTeamMembers);
    console.log("team " + JSON.stringify(teamMemberArr));

    //Calculating number of cards in each column
    if((numTeamMembers % 4) == 0 && teamMemberArr.length != 0){
        let copiedArr = teamMemberArr; //do calculations on the copied array
        let numCards = numTeamMembers/4;
        countFourColOne = numCards;
        for(let i = 0; i<countFourColOne; i++){
          let popped = copiedArr.pop();
          colOneArr.push(popped);  //pushes popped elements into the array
        }
        countFourColTwo = numCards;
        for(let i = 0; i<countFourColTwo; i++){
          let popped = copiedArr.pop();
          colTwoArr.push(popped);  //pushes popped elements into the array
        }
        countFourColThree = numCards;
        for(let i = 0; i<countFourColThree; i++){
          let popped = copiedArr.pop();
          colThreeArr.push(popped);  //pushes popped elements into the array
        }
        countFourColFour = numCards;
        for(let i = 0; i<countFourColFour; i++){
          let popped = copiedArr.pop();
          colFourArr.push(popped);  //pushes popped elements into the array
        }
        
    }
    else if((numTeamMembers % 4) == 2 && teamMemberArr.length != 0){
        let copiedArr = teamMemberArr;
        let numCards = Math.floor(numTeamMembers/4);
        countFourColOne = numCards;
        for(let i = 0; i<countFourColOne; i++){
          let popped = copiedArr.pop();
          colOneArr.push(popped);  //pushes popped elements into the array
        }
        countFourColTwo = numCards + 1;
        for(let i = 0; i<countFourColTwo; i++){
          let popped = copiedArr.pop();
          colTwoArr.push(popped);  //pushes popped elements into the array
        }
        countFourColThree = numCards + 1;
        for(let i = 0; i<countFourColThree; i++){
          let popped = copiedArr.pop();
          colThreeArr.push(popped);  //pushes popped elements into the array
        }
        countFourColFour = numCards;
        for(let i = 0; i<countFourColFour; i++){
          let popped = copiedArr.pop();
          colFourArr.push(popped);  //pushes popped elements into the array
        }
    }
    console.log(JSON.stringify(colOneArr));
    console.log(JSON.stringify(colTwoArr));
    console.log(JSON.stringify(colThreeArr));
    console.log(JSON.stringify(colFourArr));
    


return (
    <div className="row">
                        {/* Column 1 */}
                        <div id="column" className="col-sm">
                            <FourColumnOne colArr={colOneArr}></FourColumnOne>
                        </div>
        
                        {/* Column 2 */}
                        <div id="column" className="col-sm">
                            <FourColumnTwo colArr={colTwoArr}></FourColumnTwo>
        
                        </div>
        
                        {/* Column 3 */}
                        <div id="column" className="col-sm">
                          <FourColumnThree colArr={colThreeArr}></FourColumnThree>
                        
                        </div>
        
                        {/* Column 4 */}
                        <div id="column" className="col-sm">
                          <FourColumnFour colArr={colFourArr}></FourColumnFour>
                          
                        </div>
        
                        
                      </div>
);
}
export default TeamMembersFourCol;
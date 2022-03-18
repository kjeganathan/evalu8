import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import EvaluationModalItem from "./evaluationModalItem";

import React, { Component, useState, useEffect, useRef } from "react";

const EvaluationModalEvals = (props) => {

  const [labelState, setLabel] = useState('Not Completed');

     //set checked to false in the beginning
    //const checked = React.useState(false);
    const handleEvalClick = (event) => {
      let checked = event.target.checked;
      console.log(checked);
      if(checked == true){
        setLabel('Completed');
      }else{
        setLabel('Not Completed');
      }
      let checkedValue = event.target.value;
      console.log(checkedValue);

      let checkedInfo = event.target.id;
      console.log(checkedInfo); //Send checkedInfo To Parent

      props.sendData(checkedInfo + "," + checked);

  }

  //pass in prop
   //object of type of eval and the number of each eval
  let count = 1;
   //sends in a single Object
  let nameOfEval = props.evalType //can be manager, peer or goal setting eval, or eval title/name
  let numOfEvals = props.evalNum; //number of each evaluation

  //DO CALCULATION BASED ON NUMBER OF EVALS HERE TO GET THE PERCENTAGE
  
  let element = "";
  let elementArr = [];
  //You have to do this individually for different evaluations because otherwise it won't work

  console.log(nameOfEval);
  console.log(count);
  element = (
      <Form.Check
      inline
      type="switch"
      onChange={handleEvalClick}
      label={labelState}
      id={props.sendTeamMember + "," + nameOfEval + "," + numOfEvals}
    />


  );
  elementArr.push(element);
  count++;
console.log(elementArr);
return (elementArr);

};

export default EvaluationModalEvals;
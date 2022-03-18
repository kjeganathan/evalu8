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
  const [data, setData] = useState('false');
  let flag = false;
  let count = 1;
   //sends in a single Object
  let nameOfEval = props.evalType //can be manager, peer or goal setting eval, or eval title/name
  let numOfEvals = props.evalNum; //number of each evaluation
  let outArrType = nameOfEval[0];

     //set checked to false in the beginning
    //const checked = React.useState(false);
    const handleEvalClick = (event) => {
      let checked = event.target.checked;
      // let checked = data;
      // let tempflag = false;
      // let tempchecked = false;
      // if(flag == true){
      //   tempflag = false;
      // }else{
      //   tempflag = true;
      // }

      // if(checked == true){
      //   tempchecked = false;
      // }else{
      //   tempchecked = true;
      // }

      // flag = tempflag;
      // checked = tempchecked;

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

  let data2 = {teammemberinfo: props.sendTeamMember, evaltype: outArrType, evalnumber: props.evalNum}
  useEffect(() => {
    console.log('use effect ran');
    
  let getChecked = async () => {
    await fetch("/api/getChecked", {
      method: "POST",
      body: JSON.stringify(data2),
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => 
    {
      let resp = await response.json();
       // the response is the ischecked value
      if(resp.length != 0){ //not undefined
        localStorage.setItem('bool', JSON.stringify(resp[0]["ischecked"]));
       
        console.log("truebool:" + JSON.parse(localStorage.getItem('bool')));
      }else{
        localStorage.setItem('bool', JSON.stringify(false));
      
        console.log("falsebool:" + JSON.parse(localStorage.getItem('bool')));
      }

      console.log('finalobj:'+ JSON.parse(localStorage.getItem('bool')));
      let newData = JSON.parse(localStorage.getItem('bool'));
      if(newData != data){
        setData(newData);
      }
      
      console.log(data);
      
    });
  }
    getChecked();
    let ischecked = JSON.parse(localStorage.getItem('bool'));
    console.log("ischecked:" + data);
  }, [data]);

  if(data == false){
    flag = false;
  }else if(data == true){
    flag = true;
  }else{
    flag = false;
  }
  console.log("flag2:"+flag);
 

  //pass in prop
   //object of type of eval and the number of each eval
  

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
      // checked={flag}
      id={props.sendTeamMember + "," + nameOfEval + "," + numOfEvals}
    />


  );
  elementArr.push(element);
  count++;
console.log(elementArr);
return (elementArr);

};

export default EvaluationModalEvals;
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import EvaluationModalItem from "./evaluationModalItem";
import React, { Component, useState, useEffect, useRef } from "react";

const EvaluationModalEvals = (props) => {

     //set checked to false in the beginning
    //const checked = React.useState(false);
    const [data, setData] = useState('');
    let num = 0;
    let seconditer = 0;
    let iteration = 0;
    
    
    let getCheck = async (nameOfEval, numOfEvals) => {
    //     await fetch('/api/getChecked',{ 
    //     method:'POST',
    //     body: JSON.stringify({teammemberinfo:props.sendTeamMember, evaltype:nameOfEval, evalnumber:numOfEvals}), 
    //     headers:{ 'Content-Type': 'application/json' } 
    //   }).then((responsenext) => responsenext.json())
    //   .then((responseJSONnext) => {
    //       console.log("responses " + responseJSONnext);
    //       console.log("person " + props.sendTeamMember + " " + nameOfEval + " " + numOfEvals);
    //     if(responseJSONnext.length !== 0 && responseJSONnext != null){
    //         console.log("ischeckedres " + props.sendTeamMember + " " + nameOfEval + " " + numOfEvals + " " + responseJSONnext[0]['ischecked']);
    //         if(responseJSONnext[0]['ischecked'] == true){
    //             console.log("restrue " + responseJSONnext[0]);
    //             localStorage.setItem('checkedVal', true);
    //             console.log("inside " + localStorage.getItem('checkedVal'));
    //             checked[0] = true;
                
    //         }
    //         else {
    //             localStorage.setItem('checkedVal', false);
    //             console.log("inside " + localStorage.getItem('checkedVal'));
    //             checked[0] = false;
            
    //         }
            
    //     }
    //   });

    //Only gives back one row
    useEffect(() => {
        const getData = async () => {
          const response = await fetch('/api/getChecked',{ 
            method:'POST',
            body: JSON.stringify({teammemberinfo:props.sendTeamMember, evaltype:nameOfEval, evalnumber:numOfEvals}), 
            headers:{ 'Content-Type': 'application/json' } 
          });
          const newData = await response.json();
            setData(newData);
            console.log("newdata " + JSON.stringify(newData) + " " + props.sendTeamMember + " " + nameOfEval + " " + numOfEvals);   
        };
    
        getData();
        console.log("num " + ++num);
      }, []);
    }

    //do something that pulls in the db so that 
    //you  can see the rows ischecked status
    
    //use the ischecked status of a row to mark it as ischecked

    const handleEvalClick = (event) => {
        let checkedpiece = event.target.checked;
        console.log("checked " + checkedpiece);

        let checkedValue = event.target.value;
        console.log(checkedValue);

        let checkedInfo = event.target.id;
        console.log(checkedInfo); //Send checkedInfo To Parent

        props.sendData(checkedInfo + "," + checkedpiece);
        // setChecked(!checked);

    }

    //pass in prop
    let evalObject = props.evalInfo; //object of type of eval and the number of each eval
    let count = 1;
    
    let evalType = props.evalData; //sends in a single Object
    let nameOfEval = evalType[0] //can be manager, peer or goal setting eval, or eval title/name
    let numOfEvals = evalObject[nameOfEval]; //number of each evaluation
    //DO CALCULATION BASED ON NUMBER OF EVALS HERE TO GET THE PERCENTAGE
    console.log(evalType);
    let element = "";
    let elementArr = [];
    let flag = false;
    // if(data.length !== 0){
    //     if(data[0]['ischecked'] == true){
    //         flag = true;
    //     }else{
    //         flag = false;
    //     }
    //     console.log("data" + data[0]['ischecked']);
    // }
    
    //You have to do this individually for different evaluations because otherwise it won't work
    for(let i = 0; i<numOfEvals; i++) { //Calls this stuff 3 times in a row
   if(props.sendTeamMember == "Jane Dore"){
    getCheck(nameOfEval, count);
    console.log("iteration, " + iteration + "," + seconditer );
    console.log("information " + JSON.stringify(data) + " " + props.sendTeamMember + " " + nameOfEval + " " + count);
    if(data.length !== 0){
        console.log(JSON.stringify(data) + " info " + data[0]['ischecked'] + " " + props.sendTeamMember + " " + nameOfEval + " " + count)
        
            if(data[0]['ischecked'] == true){
                flag = true;
                console.log("person " + flag + " " + props.sendTeamMember + " " + nameOfEval + " " + count)
            }else{
                flag = false;
                console.log("person " + flag + " " + props.sendTeamMember + " " + nameOfEval + " " + count)
            }
            console.log("data" + data[0]['ischecked']);
            
        
    }
}
    seconditer++;
    // console.log('checkedVal ' + checked[0] + " " +  props.sendTeamMember + " " + nameOfEval + " " + numOfEvals)
    
    element = (
        <Form.Check
        inline
        checked={flag}
        onChange={handleEvalClick}
        label={"Evaluation "+count}
        name="group1"
        id={props.sendTeamMember + "," + nameOfEval + "," + count}
      />
         
                
    );
    elementArr.push(element);
    count++;
}
iteration++;
console.log(elementArr);
return (elementArr);

};

export default EvaluationModalEvals;
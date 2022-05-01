import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import EvaluationModalItem from "./evaluationModalItem";
import { useState } from "react";
import "./evaluationModal.css";

const EvaluationModal = (props) => {
  

  const [managerEval, setManagerEval] = useState('');
  const [peerEval, setPeerEval] = useState('');
  const [goalEval, setGoalEval] = useState('');
  let total_index = 0;
  let coursedata = JSON.parse(localStorage.getItem("course"));
  let admindata = JSON.parse(localStorage.getItem("admin"));
  let managerdata = JSON.parse(localStorage.getItem("github_username"));


  let handleSubmit = (event) => {
    event.preventDefault();
    console.log("hi");
    console.log("met " + managerEval['Manager Evaluations']);
    console.log("pe " + peerEval['Peer Evaluations']);
    console.log("ge " + goalEval['Goal Setting Evaluations']);

    let arr = [];
    if(managerEval["Manager Evaluations"] != 0){
      arr.push(managerEval);
    }
    if(peerEval["Peer Evaluations"] != 0){
      arr.push(peerEval);
    }
    if(goalEval["Goal Setting Evaluations"] != 0){
      arr.push(goalEval);
    }
    console.log("arr " + arr);

    let admin_name = "Cindy Shah";
    let admin_course = "COMPSCI 320";


    let data = {name:admin_name, course:admin_course, evalmetrics:arr}
    
    fetch('/api/adminEvalMetrics',{ 
      method:'POST', 
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' } 
    });
    //send arr to backend admin db evalmetrics
  }

  let handleChange1 = (e) => {
    setManagerEval({
      [e.target.name]: e.target.value
    });
    console.log("bye");
  }

  let handleChange2 = (e) => {
    setPeerEval({
      [e.target.name]: e.target.value
    });
    console.log("bye");
  }

  let handleChange3 = (e) => {
    setGoalEval({
      [e.target.name]: e.target.value
    });
    console.log("bye");
  }


  let evaluations = JSON.parse(localStorage.getItem('eval_arr'));


  let saveFunction = async (valArr) => {
    //find if team member is already in the db
    console.log("valArr:" + valArr);
    if(valArr[0] != null){
    let data = await fetch("/api/viewEvaluation", {
      method: "POST",
      body: JSON.stringify({
        teammemberinfo: valArr[0],
        evaltype: valArr[1],
        evalnumber: valArr[2],
        course:coursedata
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(async (responseJSON) => {
        console.log(responseJSON);
        if (responseJSON.length === 0) {
          await fetch("/api/addEvaluation", {
            method: "POST",
            body: JSON.stringify({
              teammemberinfo: valArr[0],
              evaltype: valArr[1],
              evalnumber: valArr[2],
              ischecked: valArr[3],
              course:coursedata,
              admin:admindata,
              manager:managerdata
            }),
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .catch((error) => {
              console.log("reset client error-------", error);
            });
        } else {
          await fetch("/api/updateEvaluation", {
            method: "POST",
            body: JSON.stringify({
              ischecked: valArr[3],
              teammemberinfo: valArr[0],
              evaltype: valArr[1],
              evalnumber: valArr[2],
              course:coursedata
            }),
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .catch((error) => {
              console.log("reset client error-------", error);
            });
        }
      })
      .catch((error) => {
        console.log("reset client error-------", error);
      });
    }
  };

  let getEvaluationStatus = async () => {
    let evals = JSON.parse(localStorage.getItem('eval_arr'));
    let evaluationStatusArr = [];
    let teamMembers = JSON.parse(localStorage.getItem('team_member_arr'));

    
    evals.forEach((evalitem) => {
      let evalType = Object.keys(evalitem);
      let evalNum = Object.values(evalitem);
      
      for(let i = 0; i<evalNum; i++){
        let index = i+1;
        let newdata = {evaltype:evalType[0], evalnumber: index, course:coursedata, manager:managerdata}
        fetch('/api/getAllEvaluations',{ 
          method:'POST', 
          body: JSON.stringify(newdata), // data can be `string` or {object}!
          headers:{ 'Content-Type': 'application/json' } 
        }).then((responsenext) => responsenext.json())
        .then(async (responseJSONnext) => {
          console.log("reseval " + responseJSONnext);
    
          console.log("resevallength:" + responseJSONnext.length);
          console.log("evalprint:" + (responseJSONnext.length != teamMembers.length));
          console.log("teamMember2length:" + teamMembers.length);
          let flag = (responseJSONnext.length != teamMembers.length);
          if(flag == true){
            evaluationStatusArr.push({type:evalType[0], num:index, status:"Incomplete"});
          }
          else{
            evaluationStatusArr.push({type:evalType[0], num:index, status:"Complete"});
          }
          localStorage.setItem('eval_status', JSON.stringify(evaluationStatusArr));
          
        });

      }
    })
  }
      
  getEvaluationStatus();
  let eval_status = JSON.parse(localStorage.getItem('eval_status'));
    

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="evaluationModal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="evaluation-modal-header" id="contained-modal-title-vcenter">
        <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    class="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                  &nbsp;
          Evaluation Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EvaluationModalItem
          sendFinalParent={saveFunction}
          evalData={evaluations}
          evaluationStatus={eval_status}
          totalIndex={total_index}
          
        ></EvaluationModalItem>
      </Modal.Body>
      <Modal.Footer>
        <Button className="evaluationSaveButton" onClick={saveFunction}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EvaluationModal;

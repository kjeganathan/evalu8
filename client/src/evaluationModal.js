import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import EvaluationModalItem from "./evaluationModalItem";
import { useState } from "react";

const EvaluationModal = (props) => {

  const [managerEval, setManagerEval] = useState('');
  const [peerEval, setPeerEval] = useState('');
  const [goalEval, setGoalEval] = useState('');

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

  //DATA STORED IN DB
  //get the dates from the db
  let admin_name = "Cindy Shah";
  let admin_course = "COMPSCI 320";
  // const [newdates, setDates] = useState([]);
  let data2 = {name:admin_name, course:admin_course}
  fetch('/api/getEvalMetricsByAdmin',{ 
    method:'POST', 
    body: JSON.stringify(data2), // data can be `string` or {object}!
    headers:{ 'Content-Type': 'application/json' } 
  }).then(async (response) => 
  {
    let resp = await response.json();
    console.log("resp:" + resp[0]['evalmetrics']);
    
    let eval_arr = [];
    // response.json();
    resp[0]['evalmetrics'].forEach((item) => {
      eval_arr.push(JSON.parse(item));
    })
    console.log(eval_arr);
    localStorage.setItem('eval_arr', JSON.stringify(eval_arr))
  });


  let evaluations = JSON.parse(localStorage.getItem('eval_arr'));


  let saveFunction = async (valArr) => {
    //find if team member is already in the db
    console.log(valArr);

    let data = await fetch("/api/viewEvaluation", {
      method: "POST",
      body: JSON.stringify({
        teammemberinfo: valArr[0],
        evaltype: valArr[1],
        evalnumber: valArr[2],
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
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Evaluation Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Admin Code */}
        <form onSubmit={handleSubmit}>
        <h5>
          Choose How Many of Each Evaluation Type you Would Like For Your Class
        </h5>

        <label for="manager_eval">Manager Evaluations (0-15):</label>

        <input
          type="number"
          onChange={handleChange1}
          id="manager_eval"
          name="Manager Evaluations"
          min="0"
          max="15"
        />

        <label for="peer_eval">Peer Evaluations (0-15):</label>

        <input type="number" onChange={handleChange2} id="peer_eval" name="Peer Evaluations" min="0" max="15" />

        <label for="goal-setting_eval">Goal-Setting Evaluations (0-15):</label>

        <input type="number" onChange={handleChange3} id="goal-setting_eval" name="Goal Setting Evaluations" min="0" max="15" />
        <button id="EvalButton" type="submit" className="btn btn-dark">Submit</button>
        </form>


        {/* Admin Code End*/}
        <EvaluationModalItem
          sendFinalParent={saveFunction}
          evalData={evaluations}
        ></EvaluationModalItem>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={saveFunction}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EvaluationModal;

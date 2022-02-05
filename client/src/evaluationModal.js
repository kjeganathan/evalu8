import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import EvaluationModalItem from "./evaluationModalItem";

const EvaluationModal = (props) => {
    //DATA STORED IN DB
    let evaluations = [{'Manager Evaluations':3}, {'Peer Evaluations':3}, {'Goal Setting Evaluations':3}] //get this from db from checking the correct evals in db

    let saveFunction = async (valArr) => {
      
      //find if team member is already in the db
      console.log(valArr);
    
      let data = await fetch('/api/viewEvaluation',{ 
        method:'POST', 
        body: JSON.stringify({teammemberinfo:valArr[0], evaltype:valArr[1], evalnumber:valArr[2]}), 
        headers:{ 'Content-Type': 'application/json' } 
      }).then((response) => response.json())
        .then(async (responseJSON) => {
        console.log(responseJSON);
        if(responseJSON.length === 0){
          await fetch('/api/addEvaluation',{ 
            method:'POST', 
            body: JSON.stringify({teammemberinfo:valArr[0], evaltype:valArr[1], evalnumber:valArr[2], ischecked:valArr[3]}), 
            headers:{ 'Content-Type': 'application/json' } 
          }).then((response) => response.json())
          .catch((error) => {
            console.log("reset client error-------",error);
       });
        }else{
          await fetch('/api/updateEvaluation',{ 
            method:'POST', 
            body: JSON.stringify({ischecked:valArr[3], teammemberinfo:valArr[0], evaltype:valArr[1], evalnumber:valArr[2]}), 
            headers:{ 'Content-Type': 'application/json' } 
          }).then((response) => response.json())
          .catch((error) => {
            console.log("reset client error-------",error);
       });
        }
      })
      .catch((error) => {
        console.log("reset client error-------",error);
   });
    }

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
          <EvaluationModalItem sendFinalParent={saveFunction} evalData={evaluations}></EvaluationModalItem>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={saveFunction}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
};

export default EvaluationModal
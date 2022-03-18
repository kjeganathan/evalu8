import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import EvaluationModalTeamMembers from "./evaluationModalTeamMembers";

const EvalModelIndividualItems = (props) => {


    let getData = (val) => {
      props.sendFinalParent(val);
    }

    let evaluationType = props.evalType;
    let numOfEvals = props.numOfEvals;

    console.log(props.evalData);
    let element = "";
    let count = 1;
    let getEvals = props.allEvalData;
    let evaluations = getEvals;
    console.log("evals:" + evaluations);
    let evalArray = [];
    let numEvalArr = [];
    for(let i = 0; i < numOfEvals; i++){
        numEvalArr.push(i);
    }
    console.log(numEvalArr);
    numEvalArr.forEach((item) => { //does this 3 times for each individual evaluation, should do this the number of times of the evaluation
        
        element = (
            <Collapsible id="meeting-list" trigger={evaluationType + " " + count}>
         <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Github Username</th>
              <th>Name</th>
              <th>Evaluation Completion</th>
            </tr>
          </thead>
          <tbody>
            {/* Send In one evaluation object depending on what evalutation it is*/}
             <EvaluationModalTeamMembers sendDataParent={getData} allEvalData={evaluations} evalNum={count} evalType={evaluationType}></EvaluationModalTeamMembers> 
          </tbody>
        </Table>  
      </Collapsible>
        );
        evalArray.push(element);
        console.log(evalArray);
        count++;
    });
   return evalArray;
};

export default EvalModelIndividualItems
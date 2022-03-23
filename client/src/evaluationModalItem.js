import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import EvaluationModalTeamMembers from "./evaluationModalTeamMembers";
import EvalModelIndividualItems from "./EvalModelIndividualItems";

const EvaluationModalItem = (props) => {

    let teamMembers = props.team_members;
    let eval_status = props.evaluationStatus;
    let total_index = props.totalIndex;

    let getData = (val) => {
      props.sendFinalParent(val);
    }

    console.log(props.evalData);
    let element = "";
    let getEvals = props.evalData;
    let evaluations = getEvals;
    // evaluations.push(getEvals.split(","));
    console.log("evals:" + evaluations);
    
    let evalArray = [];
    evaluations.forEach((evaluation) => { 
        console.log(evaluation);
        //we should send the number of evals depending on the object.keys(evaluation)
        let numOfEvals = Object.values(evaluation); //gives the number of each eval
        console.log("numOfEvals:" + numOfEvals);
        element = (
            <Collapsible id="meeting-list" trigger={Object.keys(evaluation)}>
              <EvalModelIndividualItems totalIndex={total_index} evaluationStatus={eval_status} team_members={teamMembers} evalType={Object.keys(evaluation)} numOfEvals={Object.values(evaluation)} sendFinalParent={getData} evalData={evaluation} allEvalData={evaluations}></EvalModelIndividualItems>
        {/* <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Completed Evaluations</th>
            </tr>
          </thead>
          <tbody>
            {/* Send In one evaluation object depending on what evalutation it is*/}
            {/* <EvaluationModalTeamMembers sendDataParent={getData} evalData={evaluation} allEvalData={evaluations}></EvaluationModalTeamMembers> 
          </tbody>
        </Table> */} 
      </Collapsible>
        );
        evalArray.push(element);
        console.log(evalArray);
        total_index++;
    });
   return evalArray;
};

export default EvaluationModalItem
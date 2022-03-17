import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import EvaluationModalTeamMembers from "./evaluationModalTeamMembers";

const EvaluationModalItem = (props) => {

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
        element = (
            <Collapsible id="meeting-list" trigger={Object.keys(evaluation)}>
        <Table striped bordered hover>
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
            <EvaluationModalTeamMembers sendDataParent={getData} evalData={evaluation} allEvalData={evaluations}></EvaluationModalTeamMembers> 
          </tbody>
        </Table>
      </Collapsible>
        );
        evalArray.push(element);
        console.log(evalArray);
    });
   return evalArray;
};

export default EvaluationModalItem
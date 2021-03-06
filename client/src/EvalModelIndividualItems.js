import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import EvaluationModalTeamMembers from "./evaluationModalTeamMembers";
import "./EvalIndividualItems.css";
import { Accordion } from "react-bootstrap";

const EvalModelIndividualItems = (props) => {


    let getData = (val) => {
      props.sendFinalParent(val);
    }

    let eval_status = props.evaluationStatus;
    let total_index = props.totalIndex;
    let statusForEval = "";
    console.log("eval_status:" + eval_status);
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
        
        console.log("evalLength:" + eval_status.length);
        for(let i = 0; i<eval_status.length;i++){
          console.log('i:' + i);
          if(eval_status[i]['type'] == evaluationType){
            if(eval_status[i]['num'] == count){
              console.log("evalObj: " + eval_status[i]['num'] + " " + eval_status[i]['type'] + " " + eval_status[i]['status']);
              statusForEval = eval_status[i]['status'];
            }
          }
        }
        
    
        element = (
      //       <Collapsible id="meeting-list" trigger={evaluationType + " " + count + "  |  " + statusForEval}>
      //    <Table striped bordered hover>
      //     <thead>
      //       <tr>
      //         <th>#</th>
      //         <th>Github Username</th>
      //         <th>Name</th>
      //         <th>Evaluation Completion</th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {/* Send In one evaluation object depending on what evalutation it is*/}
      //        <EvaluationModalTeamMembers sendDataParent={getData} allEvalData={evaluations} evalNum={count} evalType={evaluationType}></EvaluationModalTeamMembers> 
      //     </tbody>
      //   </Table>  
      // </Collapsible>

      <Accordion defaultActiveKey="0" className="evaluationAccordion">
          <Accordion.Item eventKey={count - 1}>
            <Accordion.Header className="evaluationAccordionTitle">
              {evaluationType + " " + count + "  |  " + statusForEval}
            </Accordion.Header>
            <Accordion.Body>
              
              <Table striped bordered hover variant="dark">
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
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        );
        evalArray.push(element);
        console.log(evalArray);
        count++;
    });
   return evalArray;
};

export default EvalModelIndividualItems
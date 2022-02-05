import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import EvaluationModalItem from "./evaluationModalItem";

const EvaluationModalEvals = (props) => {

    const handleEvalClick = (event) => {
        let checked = event.target.checked;
        console.log(checked);

        let checkedValue = event.target.value;
        console.log(checkedValue);

        let checkedInfo = event.target.id;
        console.log(checkedInfo); //Send checkedInfo To Parent

        props.sendData(checkedInfo + "," + checked);

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
    //You have to do this individually for different evaluations because otherwise it won't work
    for(let i = 0; i<numOfEvals; i++) {
    console.log(nameOfEval);
    console.log(count);
    element = (
        <Form.Check
        inline
        onChange={handleEvalClick}
        label={"Evaluation "+count}
        name="group1"
        id={props.sendTeamMember + "," + nameOfEval + "," + count}
      />
         
                
    );
    elementArr.push(element);
    count++;
}
console.log(elementArr);
return (elementArr);

};

export default EvaluationModalEvals;
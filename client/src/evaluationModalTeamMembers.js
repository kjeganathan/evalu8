import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import EvaluationModalItem from "./evaluationModalItem";
import EvaluationModalEvals from "./evaluationModalevals";

const EvaluationModalTeamMembers = (props) => {

  let teamMemberEvalObj = {
    teamMemberName: "",
    evalType:"",
    evalNumber:"",
    isChecked:""
  }

  let getData = async (val) => {
    console.log(val); //ex. Jane Dore, Manager Evaluation, 2
    let valArr = val.split(",");
    teamMemberEvalObj = {
      teamMemberInfo: valArr[0],
      evalType: valArr[1],
      evalNumber: valArr[2],
      isChecked: valArr[3]
    }

    props.sendDataParent(valArr);
  }

    
    //pass in prop
    let evaluation = props.evalData;
    let count = 1;
    let member = "";
    let memberArr = [];
    let teamMembers = ["Jane Dore", "Josh Hase", "Derek Hawks", "Rayne Masters", "Tez Martinez",
    "Naomi Reid", "Eric Anderson", "Dayton Peerson", "Lucy Lu", "Jackie Lester"];

    teamMembers.forEach((teamMember) => {
    console.log(teamMember);
    console.log(evaluation);
  
    member = (
    
          <tr>
              <td>{count}</td>
              <td>{teamMember}</td>
              <td>{teamMember + "@gmail.com"}</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      
                      <EvaluationModalEvals sendData={getData} sendTeamMember={teamMember} evalData={Object.keys(evaluation)} evalInfo={evaluation}></EvaluationModalEvals>
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
    );
    memberArr.push(member);
    count++;
});
console.log(memberArr);
return (memberArr);

};

export default EvaluationModalTeamMembers
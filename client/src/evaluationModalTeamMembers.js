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
    evalType: "",
    evalNumber: "",
    isChecked: "",
  };

  let getData = async (val) => {
    console.log("val:" + val); //ex. Jane Dore, Manager Evaluation, 2
    let valArr = val.split(",");
    teamMemberEvalObj = {
      teamMemberInfo: valArr[0],
      evalType: valArr[1],
      evalNumber: valArr[2],
      isChecked: valArr[3],
    };

    props.sendDataParent(valArr);
  };

  //pass in prop
  // let evaluation = props.evalData;
  let evaluationType = props.evalType;
  let evaluationNum = props.evalNum;
  console.log("evalNum:" + evaluationNum);
  let count = 1;
  let index = 0;
  let member = "";
  let memberArr = [];
  let teamMembers = JSON.parse(
    localStorage.getItem("team_member_github_username")
  );
  let team_member_name_arr = JSON.parse(
    localStorage.getItem("team_member_name")
  );
  console.log(teamMembers);

  if (teamMembers.length != 0) {
    teamMembers.forEach((teamMember) => {
      let team_member_name = team_member_name_arr[index];

      member = (
        <tr>
          <td>{count}</td>
          <td>{teamMember}</td>
          <td>{team_member_name}</td>
          <td>
            <EvaluationModalEvals
              sendData={getData}
              sendTeamMember={teamMember}
              evalNum={evaluationNum}
              evalType={evaluationType}
            ></EvaluationModalEvals>
          </td>
        </tr>
      );
      memberArr.push(member);
      count++;
      index++;
    });
    console.log(memberArr);
    return memberArr;
  }
};

export default EvaluationModalTeamMembers;

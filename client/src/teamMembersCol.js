
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./teamMembers.css";
import TeamMembersFourCol from "./teamMembersFourCol";
import TeamMembersFiveCol from "./teamMembersFiveCol";

class TeamMembersCol extends Component {
    constructor(){
        super();
    
        this.state = {
          teamMember_count:0,
          teamMemberArr:[]
          };
      }
      
      async componentDidMount(){
        //get number of team members under a manager
        console.log("hello");
        let manager = localStorage.getItem("github_username");
        let course = localStorage.getItem("course");
        let jsonManager = JSON.parse(manager);
        let jsonCourse = JSON.parse(course);
        console.log(manager);
        console.log(course);
        await fetch('/api/getAllTeamMembersByManagerAndCourse',{ 
          method:'POST', 
          body: JSON.stringify({manager_name:jsonManager, course:jsonCourse}), 
          headers:{ 'Content-Type': 'application/json' } 
        }).then(async response => 
        {
          let res = await response.json();
          console.log(res);
          
          // response.json();
          res.forEach((item) => {
            let newState = this.state.teamMember_count + 1;
              this.setState({
                teamMember_count: newState,
              });
          })
          console.log(this.state.teamMember_count);
          this.setState({
            teamMemberArr: res,
          });
          console.log(this.state.teamMemberArr);
        }) 
        
      }


render() {
    if((this.state.teamMember_count % 4) == 0 || (((this.state.teamMember_count % 4) == 2) && ((this.state.teamMember_count % 3) != 0) && ((this.state.teamMember_count % 5) != 0))){
       return(     
           <TeamMembersFourCol count={this.state.teamMember_count} teamMembers={this.state.teamMemberArr}></TeamMembersFourCol>
            )
    }else{

    return (
        <TeamMembersFiveCol count={this.state.teamMember_count} teamMembers={this.state.teamMemberArr}></TeamMembersFiveCol>
    )
    }
}
}

export default TeamMembersCol;
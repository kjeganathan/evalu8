//import useState hook to create menu collapse state
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import "react-pro-sidebar/dist/css/styles.css";
import "./sideNav.css";
import AttendanceModal from "./attendanceModal";
import EvaluationModal from "./evaluationModal";
import ProfileModal from "./profileModal";

const TeamSideNav = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(true);

  const [attendanceModalShow, setAttendanceModalShow] = React.useState(false);
  const [evaluationModalShow, setEvaluationModalShow] = React.useState(false);
  const [profileModalShow, setProfileModalShow] = React.useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const logoutClick = () => {
    localStorage.clear();
  }


  const myTeamTooltip = props => (
    <Tooltip {...props}>My Team</Tooltip>
  );

  const attendanceTooltip = props => (
    <Tooltip {...props}>Attendance</Tooltip>
  );

  const evaluationTooltip = props => (
    <Tooltip {...props}>Evaluation</Tooltip>
  );

  const logoutTooltip = props => (
    <Tooltip {...props}>Log Out</Tooltip>
  );

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          {/* <SidebarHeader> */}
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>
                  {/* {menuCollapse ? "Logo" : "Big Logo"} */}
              <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                
              ) : (
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
                
              )}
            </div>
              </p>
              
            </div>
            
          {/* </SidebarHeader> */}
          <SidebarContent>
            <Menu iconShape="square">
                <br/>
                <OverlayTrigger placement="left" overlay={myTeamTooltip}>
              <MenuItem
                active={true}
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                  </svg>
                }
              >
                My Team
              </MenuItem>
              </OverlayTrigger>
                <br/>


                {/* <MenuItem
                onClick={() => setProfileModalShow(true)}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
                }
              >
                Profile
              </MenuItem>
              <ProfileModal
                    show={profileModalShow}
                    onHide={() => setProfileModalShow(false)}
                /> */}
              
              <OverlayTrigger placement="left" overlay={logoutTooltip}>
              <MenuItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                  </svg>
                }
                onClick={logoutClick}
              >
                Logout
                <Link to="/login" />
              </MenuItem>
              </OverlayTrigger>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  );
};

export default TeamSideNav;

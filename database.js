process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';

const pgp = require("pg-promise")({
    connect(client) {
      console.log("Connected to database:", client.connectionParameters.database);
    },
  
    disconnect(client) {
      console.log(
        "Disconnected from database:",
        client.connectionParameters.database
      );
    },
});

let secrets = require('./secrets.json');
let username = secrets.username;
let password = secrets.password;

let url = `postgres://${username}:${password}@ec2-54-87-34-201.compute-1.amazonaws.com:5432/d2t1ehpcp5iq2?sslmode=require`;

const db = pgp(url);

async function connectAndRun(task) {
    let connection = null;
  
    try {
      connection = await db.connect();
      return await task(connection);
    } catch (e) {
      // eslint-disable-next-line no-useless-catch
      throw e;
    } finally {
      try {
        connection.done();
      } catch (ignored) {
        // eslint-disable-next-line no-empty
      }
    }
}

//Password Function

async function getPassword(name, classroom){
  return await connectAndRun((db) =>
  db.any(
    "SELECT password FROM managers WHERE github_username = $1 and classroom = $2;",
    [name, classroom]
      )
    );
}


//ADMIN DB FUNCTIONS

async function addAdmin(name, course, attendancedates, evalmetrics) {
  return await connectAndRun((db) =>
    db.none(
      "INSERT INTO admin (name, course, attendancedates, evalmetrics) VALUES ($1, $2, $3, $4);",
      [name, course, attendancedates, evalmetrics]
    )
  );
}

async function updateAdminAttendance(name, course, attendancedates) {
  return await connectAndRun((db) =>
  db.any(
    "UPDATE admin SET attendancedates = $1 WHERE name = $2 and course = $3;",
    [attendancedates, name, course]
      )
    );
}

async function updateAdminEvalMetrics(name, course, evalmetrics) {
  return await connectAndRun((db) =>
  db.any(
    "UPDATE admin SET evalmetrics = $1 WHERE name = $2 and course = $3;",
    [evalmetrics, name, course]
      )
    );
}

async function getAttendanceByAdmin(name, course){
  return await connectAndRun((db) =>
  db.any(
    "SELECT attendancedates FROM admin WHERE name = $1 and course = $2;",
    [name, course]
      )
    );
}

async function getEvalMetricsByAdmin(name, course){
  return await connectAndRun((db) =>
  db.any(
    "SELECT evalmetrics FROM admin WHERE name = $1 and course = $2;",
    [name, course]
      )
    );
}

async function getAllAdmins(){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM admin;",
      )
    );
}

async function getEmailByGitUsername(name){
  return await connectAndRun((db) =>
  db.any(
    "SELECT email FROM teammember WHERE github_username = $1;",
    [name]
      )
    );
}



// Database functions for log in 
async function addUser(name, classroom, github_username, github_reponame, github_token, password, admin) {
    return await connectAndRun((db) =>
      db.none(
        "INSERT INTO managers (name, classroom, github_username, github_reponame, github_token, password, admin) VALUES ($1, $2, $3, $4, $5, $6, $7);",
        [name, classroom, github_username, github_reponame, github_token, password, admin]
      )
    );
}

// Database functions for attendance

async function getAllAttendance(){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM attendanceondate;"
      )
    );
}

async function addAttendanceByDate(status, teammemberinfo, date, email, course, fullname, admin, manager) {
  return await connectAndRun((db) =>
  db.none(
    "INSERT INTO attendanceondate (status, teammemberinfo, date, email, course, fullname, admin, manager) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
    [status, teammemberinfo, date, email, course, fullname, admin, manager]
      )
    );
}

async function updateAttendanceByDate(status, teammemberinfo, date, course) {
  return await connectAndRun((db) =>
  db.any(
    "UPDATE attendanceondate SET status = $1 WHERE teammemberinfo = $2 and date = $3 and course = $4;",
    [status, teammemberinfo, date, course]
      )
    );
}

async function viewAttendanceByDate(teammemberinfo, date, course){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM attendanceondate WHERE teammemberinfo = $1 and date = $2 and course = $3;",
    [teammemberinfo, date, course]
      )
    );
}

async function getAllAttendanceByDate(date, course, manager){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM attendanceondate WHERE date = $1 and course = $2 and manager = $3;",
    [date, course, manager]
      )
    );
}

async function getMemberAttendanceOnDate(teammemberinfo, course){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM attendanceondate WHERE teammemberinfo = $1 and course = $2;",
    [teammemberinfo, course]
      )
    );
}

async function statusAttendanceByDate(teammemberinfo, date, course){
  return await connectAndRun((db) =>
  db.any(
    "SELECT status FROM attendanceondate WHERE teammemberinfo = $1 and date = $2 and course = $3;",
    [teammemberinfo, date, course]
      )
    );
}


//Takes a managers email and sets the teammembers where the email is the same
async function addTeamMembers(github_username, github_reponame, team_members){
    return await connectAndRun((db) =>
      db.none(
        "UPDATE managers SET team_members = $1 WHERE github_username = $2 AND github_reponame = $3",
        [team_members, github_username, github_reponame]
      )
    );
}

async function addToTeamMemberTable(name, course, github_username, manager_name, email, admin) {
  return await connectAndRun((db) =>
    db.none(
      "INSERT INTO teammember (name, course, github_username, manager_name, email, admin) VALUES ($1, $2, $3, $4, $5, $6);",
      [name, course, github_username, manager_name, email, admin]
    )
  );
}

async function getAllTeamMembersByManagerAndCourse(manager_name, course){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM teammember WHERE manager_name = $1 and course = $2;",
    [manager_name, course]
      )
    );
}

async function getRepoNameByManagerAndCourse(manager_name, course){
  return await connectAndRun((db) =>
  db.any(
    "SELECT github_reponame FROM managers WHERE github_username = $1 and classroom = $2;",
    [manager_name, course]
      )
    );
}

async function getTokenAndAdminByManager(manager_name, classroom){
  return await connectAndRun((db) =>
  db.any(
    "SELECT github_token, admin FROM managers WHERE github_username = $1 and classroom = $2;",
    [manager_name, classroom]
      )
    );
}


//evaluation endpoints

async function addEval(teamMemberInfo, evalType, evalNumber, isChecked, course, admin, manager) {
  return await connectAndRun((db) =>
    db.none(
      "INSERT INTO evaluations (teammemberinfo, evaltype, evalnumber, ischecked, course, admin, manager) VALUES ($1, $2, $3, $4, $5, $6, $7);",
      [teamMemberInfo, evalType, evalNumber, isChecked, course, admin, manager]
    )
  );
}

async function getAllEvaluations(evaltype, evalnumber, course, manager){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM evaluations WHERE evaltype = $1 and evalnumber = $2 and course = $3 and manager = $4;",
    [evaltype, evalnumber, course, manager]
      )
    );
}

//added course
async function viewEval(teammemberinfo, evaltype, evalnumber, course){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM evaluations WHERE teammemberinfo = $1 and evaltype = $2 and evalnumber = $3 and course = $4;",
    [teammemberinfo, evaltype, evalnumber, course]
      )
    );
}

//added course
async function getChecked(teammemberinfo, evaltype, evalnumber, course){
  return await connectAndRun((db) =>
  db.any(
    "SELECT ischecked FROM evaluations WHERE teammemberinfo = $1 and evaltype = $2 and evalnumber=$3 and course = $4;",
    [teammemberinfo, evaltype, evalnumber, course]
      )
    );
}

//added course
async function getEvalByMember(teammemberinfo, ischecked, course){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM evaluations WHERE teammemberinfo = $1 and ischecked = $2 and course = $3;",
    [teammemberinfo, ischecked, course]
      )
    );
}

//not used
async function getDistinctEvalType(){
  return await connectAndRun((db) =>
  db.any(
    "SELECT DISTINCT evaltype FROM evaluations;"
      )
    );
}

//added course
async function updateEval(ischecked, teammemberinfo, evaltype, evalnumber, course) {
  return await connectAndRun((db) =>
  db.any(
    "UPDATE evaluations SET ischecked = $1 WHERE teammemberinfo = $2 and evaltype = $3 and evalnumber = $4 and course = $5;",
    [ischecked, teammemberinfo, evaltype, evalnumber, course]
      )
    );
}

//progress endpoints

async function addProgress(progress, pacing, satisfaction, environment, email, course, admin) {
  return await connectAndRun((db) =>
  db.none(
    "INSERT INTO progress (progress, pacing, satisfaction, environment, email, course, admin) VALUES ($1, $2, $3, $4, $5, $6, $7);",
    [progress, pacing, satisfaction, environment, email, course, admin]
      )
    );
}

async function updateProgress(progress, pacing, satisfaction, environment, email, course) {
  return await connectAndRun((db) =>
  db.any(
    "UPDATE progress SET progress = $1, pacing = $2, satisfaction = $3, environment = $4 WHERE email = $5 and course = $6;",
    [progress, pacing, satisfaction, environment, email, course]
      )
    );
}

async function getProgressByEmailAndCourse(email, course){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM progress WHERE email = $1 and course = $2;",
    [email, course]
      )
    );
}

//Deleting content of tables

async function deleteManagers(admin, course){
  return await connectAndRun((db) =>
  db.any(
    "DELETE FROM managers WHERE admin = $1 and classroom = $2;",
    [admin, course]
      )
    );
}

async function deleteAttendance(admin, course){
  return await connectAndRun((db) =>
  db.any(
    "DELETE FROM attendanceondate WHERE admin = $1 and course = $2;",
    [admin, course]
      )
    );
}

async function deleteEvaluations(admin, course){
  return await connectAndRun((db) =>
  db.any(
    "DELETE FROM evaluations WHERE admin = $1 and course = $2;",
    [admin, course]
      )
    );
}

async function deleteProgress(admin, course){
  return await connectAndRun((db) =>
  db.any(
    "DELETE FROM progress WHERE admin = $1 and course = $2;",
    [admin, course]
      )
    );
}

async function deleteTeamMember(admin, course){
  return await connectAndRun((db) =>
  db.any(
    "DELETE FROM teammember WHERE admin = $1 and course = $2;",
    [admin, course]
      )
    );
}





module.exports = {
addUser,
addTeamMembers,
addToTeamMemberTable,
getAllTeamMembersByManagerAndCourse,
getRepoNameByManagerAndCourse,
addAttendanceByDate,
updateAttendanceByDate,
viewAttendanceByDate,
getMemberAttendanceOnDate,
statusAttendanceByDate,
addEval,
viewEval,
updateEval,
getEvalByMember,
getDistinctEvalType,
getChecked,
getTokenAndAdminByManager,
addAdmin,
updateAdminAttendance,
getAttendanceByAdmin,
updateAdminEvalMetrics,
getEvalMetricsByAdmin,
getAllAttendanceByDate,
getAllEvaluations,
getAllAdmins,
getEmailByGitUsername,
getAllAttendance,
addProgress,
getProgressByEmailAndCourse,
updateProgress,
getPassword,
deleteAttendance,
deleteEvaluations,
deleteManagers,
deleteProgress,
deleteTeamMember

};
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

//ADMIN DB FUNCTIONS

async function addAdmin(name, course, password, attendancedates, evalmetrics, evaluationtypes) {
  return await connectAndRun((db) =>
    db.none(
      "INSERT INTO admin (name, course, password, attendancedates, evalmetrics, evaluationtypes) VALUES ($1, $2, $3, $4, $5, $6);",
      [name, course, password, attendancedates, evalmetrics, evaluationtypes]
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

async function addAttendanceByDate(status, teammemberinfo, date, email, course, fullname, admin) {
  return await connectAndRun((db) =>
  db.none(
    "INSERT INTO attendanceondate (status, teammemberinfo, date, email, course, fullname, admin) VALUES ($1, $2, $3, $4, $5, $6, $7);",
    [status, teammemberinfo, date, email, course, fullname, admin]
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

async function getAllAttendanceByDate(date, course){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM attendanceondate WHERE date = $1 and course = $2;",
    [date, course]
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

async function addToTeamMemberTable(name, course, github_username, manager_name, email) {
  return await connectAndRun((db) =>
    db.none(
      "INSERT INTO teammember (name, course, github_username, manager_name, email) VALUES ($1, $2, $3, $4, $5);",
      [name, course, github_username, manager_name, email]
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

async function addEval(teamMemberInfo, evalType, evalNumber, isChecked) {
  return await connectAndRun((db) =>
    db.none(
      "INSERT INTO evaluations (teammemberinfo, evaltype, evalnumber, ischecked) VALUES ($1, $2, $3, $4);",
      [teamMemberInfo, evalType, evalNumber, isChecked]
    )
  );
}

async function getAllEvaluations( evaltype, evalnumber){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM evaluations WHERE evaltype = $1 and evalnumber = $2;",
    [evaltype, evalnumber]
      )
    );
}

async function viewEval(teammemberinfo, evaltype, evalnumber){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM evaluations WHERE teammemberinfo = $1 and evaltype = $2 and evalnumber = $3;",
    [teammemberinfo, evaltype, evalnumber]
      )
    );
}

async function getChecked(teammemberinfo, evaltype, evalnumber){
  return await connectAndRun((db) =>
  db.any(
    "SELECT ischecked FROM evaluations WHERE teammemberinfo = $1 and evaltype = $2 and evalnumber=$3;",
    [teammemberinfo, evaltype, evalnumber]
      )
    );
}

async function getEvalByMember(teammemberinfo, ischecked){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM evaluations WHERE teammemberinfo = $1 and ischecked = $2;",
    [teammemberinfo, ischecked]
      )
    );
}

async function getDistinctEvalType(){
  return await connectAndRun((db) =>
  db.any(
    "SELECT DISTINCT evaltype FROM evaluations;"
      )
    );
}

async function updateEval(ischecked, teammemberinfo, evaltype, evalnumber) {
  return await connectAndRun((db) =>
  db.any(
    "UPDATE evaluations SET ischecked = $1 WHERE teammemberinfo = $2 and evaltype = $3 and evalnumber = $4;",
    [ischecked, teammemberinfo, evaltype, evalnumber]
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
getAllAttendance
};
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

// Database functions for log in 
async function addUser(name, classroom, github_username, github_reponame, github_token, password) {
    return await connectAndRun((db) =>
      db.none(
        "INSERT INTO managers (name, classroom, github_username, github_reponame, github_token, password) VALUES ($1, $2, $3, $4, $5, $6);",
        [name, classroom, github_username, github_reponame, github_token, password]
      )
    );
}

async function addAttendanceByDate(status, teammemberinfo, date) {
  return await connectAndRun((db) =>
  db.none(
    "INSERT INTO attendanceondate (status, teammemberinfo, date) VALUES ($1, $2, $3);",
    [status, teammemberinfo, date]
      )
    );
}

async function updateAttendanceByDate(status, teammemberinfo, date) {
  return await connectAndRun((db) =>
  db.any(
    "UPDATE attendanceondate SET status = $1 WHERE teammemberinfo = $2 and date = $3;",
    [status, teammemberinfo, date]
      )
    );
}

async function viewAttendanceByDate(teammemberinfo, date){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM attendanceondate WHERE teammemberinfo = $1 and date = $2;",
    [teammemberinfo, date]
      )
    );
}

async function getMemberAttendanceOnDate(teammemberinfo){
  return await connectAndRun((db) =>
  db.any(
    "SELECT * FROM attendanceondate WHERE teammemberinfo = $1;",
    [teammemberinfo]
      )
    );
}

async function statusAttendanceByDate(teammemberinfo, date){
  return await connectAndRun((db) =>
  db.any(
    "SELECT status FROM attendanceondate WHERE teammemberinfo = $1 and date = $2;",
    [teammemberinfo, date]
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

async function addToTeamMemberTable(name, course, github_username, manager_name) {
  return await connectAndRun((db) =>
    db.none(
      "INSERT INTO teammember (name, course, github_username, manager_name) VALUES ($1, $2, $3, $4);",
      [name, course, github_username, manager_name]
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
getChecked
};
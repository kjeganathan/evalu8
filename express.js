'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const express = require('express');
const path = require("path");
const dblast = require("./database.js");
const gitapi = require('./routes/gitapi');
const app = express();

app.use(express.json()); // lets you handle JSON input
//app.use(express.static('src/')); // specify the directory 
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // res.setHeader('kjeganathan', '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');
    next();
});

app.use('/gitapi', gitapi);

app.use(express.static(path.join(__dirname, "client/build")));

/* ADMIN END POINTS */

app.post("/api/createAdmin", async (req, res) => {
    const data = req.body;
    await dblast.addAdmin(data.name, data.course, data.password, data.attendancedates, data.evalmetrics, data.evaluationtypes);
    console.log("Created a new account successfully!");
    res.sendStatus(200);
});

app.post("/api/adminAttendance", async (req, res) => {
    const data = req.body;
    await dblast.updateAdminAttendance(data.name, data.course, data.attendancedates);
    res.sendStatus(200);
});

app.post("/api/adminEvalMetrics", async (req, res) => {
    const data = req.body;
    await dblast.updateAdminEvalMetrics(data.name, data.course, data.evalmetrics);
    res.sendStatus(200);
});

app.post("/api/getAllAdmins", async (req, res) => {
    let result = await dblast.getAllAdmins();
    res.send(result);
});

app.post("/api/getAttendanceByAdmin", async (req, res) => {
    const data = req.body;
    let result = await dblast.getAttendanceByAdmin(data.name, data.course);
    res.send(result);
});

app.post("/api/getEvalMetricsByAdmin", async (req, res) => {
    const data = req.body;
    let result = await dblast.getEvalMetricsByAdmin(data.name, data.course);
    res.send(result);
});

//ADMIN ENDPOINTS END

app.post("/api/emailByGitUsername", async (req, res) => {
    const data = req.body;
    let result = await dblast.getEmailByGitUsername(data.name);
    res.send(result);
});

app.post("/api/createAccount", async (req, res) => {
    const data = req.body;
    await dblast.addUser(data.name, data.classroom, data.github_username, data.github_reponame, data.github_token, data.password, data.admin);
    console.log("Created a new account successfully!");
    res.sendStatus(200);
});

//Not used
app.get("/api/getAllAttendance", async (req, res) => {
    let result = await dblast.getAllAttendance();
    res.send(result);
});

app.post("/api/addAttendanceByDate", async (req, res) => {
    const data = req.body;
    await dblast.addAttendanceByDate(data.status, data.teammemberinfo, data.date, data.email, data.course, data.fullname, data.admin, data.manager);
    res.sendStatus(200);
});

app.post("/api/updateAttendanceByDate", async (req, res) => {
    const data = req.body;
    await dblast.updateAttendanceByDate(data.status, data.teammemberinfo, data.date, data.course);
    res.sendStatus(200);
});

app.post("/api/viewAttendanceByDate", async (req, res) => {
    const data = req.body;
    let result = await dblast.viewAttendanceByDate(data.teammemberinfo, data.date, data.course);
    res.send(result);
});

app.post("/api/getAllAttendanceByDate", async (req, res) => {
    const data = req.body;
    let result = await dblast.getAllAttendanceByDate(data.date, data.course, data.manager);
    res.send(result);
});

app.post("/api/statusAttendanceByDate", async (req, res) => {
    const data = req.body;
    let result = await dblast.statusAttendanceByDate(data.teammemberinfo, data.date, data.course);
    res.send(result);
});

app.post("/api/getMemberAttendanceByDate", async (req, res) => {
    const data = req.body;
    let result = await dblast.getMemberAttendanceOnDate(data.teammemberinfo, data.course);
    res.send(result);
});

app.post("/api/addTeamMembers", async (req, res) => {
    const data = req.body;
    await dblast.addTeamMembers(data.github_username, data.github_reponame, data.team_members);
    console.log("Added team members of manager to their account!");
    res.sendStatus(200);
});

app.post("/api/addToTeamMemberTable", async (req, res) => {
    const data = req.body;
    await dblast.addToTeamMemberTable(data.name, data.course, data.github_username, data.manager_name, data.email);
    console.log("Added team member to teammember table");
    res.sendStatus(200);
});

app.post("/api/getAllTeamMembersByManagerAndCourse", async (req, res) => {
    const data = req.body;
    let result = await dblast.getAllTeamMembersByManagerAndCourse(data.manager_name, data.course);
    res.send(result);
});

app.post("/api/getRepoNameByManagerAndCourse", async (req, res) => {
    const data = req.body;
    let result = await dblast.getRepoNameByManagerAndCourse(data.manager_name, data.course);
    res.send(result);
});

app.post("/api/getTokenAndAdminByManager", async (req, res) => {
    const data = req.body;
    let result = await dblast.getTokenAndAdminByManager(data.manager_name, data.classroom);
    res.send(result);
});

app.post("/api/addEvaluation", async (req, res) => {
    const data = req.body;
    await dblast.addEval(data.teammemberinfo, data.evaltype, data.evalnumber, data.ischecked, data.course, data.admin, data.manager);
    res.sendStatus(200);
});

app.post("/api/getAllEvaluations", async (req, res) => {
    const data = req.body;
    let result = await dblast.getAllEvaluations(data.evaltype, data.evalnumber, data.course, data.manager);
    res.send(result);
});

app.post("/api/viewEvaluation", async (req, res) => {
    const data = req.body;
    let result = await dblast.viewEval(data.teammemberinfo, data.evaltype, data.evalnumber, data.course);
    res.send(result);
});

app.post("/api/getChecked", async (req, res) => {
    const data = req.body;
    let result = await dblast.getChecked(data.teammemberinfo, data.evaltype, data.evalnumber, data.course);
    res.send(result);
});

app.post("/api/getEvalByMember", async (req, res) => {
    const data = req.body;
    let result = await dblast.getEvalByMember(data.teammemberinfo, data.ischecked, data.course);
    res.send(result);
});

app.get("/api/getDistinctEvalType", async (req, res) => {
    let result = await dblast.getDistinctEvalType();
    res.send(result);
});

app.post("/api/updateEvaluation", async (req, res) => {
    const data = req.body;
    await dblast.updateEval(data.ischecked, data.teammemberinfo, data.evaltype, data.evalnumber, data.course);
    res.sendStatus(200);
});

//Progress Endpoints

app.post("/api/addProgress", async (req, res) => {
    const data = req.body;
    await dblast.addProgress(data.progress, data.pacing, data.satisfaction, data.environment, data.email, data.course);
    console.log("Created a new account successfully!");
    res.sendStatus(200);
});

app.post("/api/getProgressByEmailAndCourse", async (req, res) => {
    const data = req.body;
    let result = await dblast.getProgressByEmailAndCourse(data.email, data.course);
    res.send(result);
});

app.post("/api/updateProgress", async (req, res) => {
    const data = req.body;
    await dblast.updateProgress(data.progress, data.pacing, data.satisfaction, data.environment, data.email, data.course);
    res.sendStatus(200);
});


//Creates links to every route on the client side
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  });

const port = 3000; // specify the port 
app.listen(process.env.PORT || port);
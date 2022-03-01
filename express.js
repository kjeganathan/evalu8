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
    res.setHeader('kjeganathan', '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');
    next();
});

app.use('/gitapi', gitapi);

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/createAccount", async (req, res) => {
    const data = req.body;
    await dblast.addUser(data.name, data.classroom, data.github_username, data.github_reponame, data.github_token, data.password);
    console.log("Created a new account successfully!");
    res.sendStatus(200);
});

app.post("/api/addAttendanceByDate", async (req, res) => {
    const data = req.body;
    await dblast.addAttendanceByDate(data.status, data.teammemberinfo, data.date);
    res.sendStatus(200);
});

app.post("/api/updateAttendanceByDate", async (req, res) => {
    const data = req.body;
    await dblast.updateAttendanceByDate(data.status, data.teammemberinfo, data.date);
    res.sendStatus(200);
});

app.post("/api/viewAttendanceByDate", async (req, res) => {
    const data = req.body;
    let result = await dblast.viewAttendanceByDate(data.teammemberinfo, data.date);
    res.send(result);
});

app.post("/api/statusAttendanceByDate", async (req, res) => {
    const data = req.body;
    let result = await dblast.statusAttendanceByDate(data.teammemberinfo, data.date);
    res.send(result);
});

app.post("/api/getMemberAttendanceByDate", async (req, res) => {
    const data = req.body;
    let result = await dblast.getMemberAttendanceOnDate(data.teammemberinfo);
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
    await dblast.addToTeamMemberTable(data.name, data.course, data.github_username, data.manager_name);
    console.log("Added team member to teammember table");
    res.sendStatus(200);
});

app.post("/api/getAllTeamMembersByManagerAndCourse", async (req, res) => {
    const data = req.body;
    let result = await dblast.getAllTeamMembersByManagerAndCourse(data.manager_name, data.course);
    res.send(result);
});

app.post("/api/addEvaluation", async (req, res) => {
    const data = req.body;
    await dblast.addEval(data.teammemberinfo, data.evaltype, data.evalnumber, data.ischecked);
    res.sendStatus(200);
});

app.post("/api/viewEvaluation", async (req, res) => {
    const data = req.body;
    let result = await dblast.viewEval(data.teammemberinfo, data.evaltype, data.evalnumber);
    res.send(result);
});

app.post("/api/getChecked", async (req, res) => {
    const data = req.body;
    let result = await dblast.getChecked(data.teammemberinfo, data.evaltype, data.evalnumber);
    res.send(result);
});

app.post("/api/getEvalByMember", async (req, res) => {
    const data = req.body;
    let result = await dblast.getEvalByMember(data.teammemberinfo, data.ischecked);
    res.send(result);
});

app.get("/api/getDistinctEvalType", async (req, res) => {
    let result = await dblast.getDistinctEvalType();
    res.send(result);
});

app.post("/api/updateEvaluation", async (req, res) => {
    const data = req.body;
    await dblast.updateEval(data.ischecked, data.teammemberinfo, data.evaltype, data.evalnumber);
    res.sendStatus(200);
});

//GITHUB API CALLS



//Creates links to every route on the client side
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  });

const port = 3000; // specify the port 
app.listen(process.env.PORT || port);
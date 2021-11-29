'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const express = require('express');
const path = require("path");
const dblast = require("./database.js");

const app = express();

app.use(express.json()); // lets you handle JSON input
//app.use(express.static('src/')); // specify the directory 

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/createAccount", async (req, res) => {
    const data = req.body;
    await dblast.addUser(data.firstname, data.lastname, data.email, data.password);
    console.log("Created a new account successfully!");
});

app.post("/api/addTeamMembers", async (req, res) => {
    const data = req.body;
    await dblast.addTeamMembers(data.email, data.teammembers);
    console.log("Added team members of manager to their account!");
});

//Creates links to every route on the client side
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  });

const port = 3000; // specify the port 
app.listen(process.env.PORT || port);
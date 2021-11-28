'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const express = require('express');
const path = require("path");

const app = express();

app.use(express.json()); // lets you handle JSON input
//app.use(express.static('src/')); // specify the directory 

app.use(express.static(path.join(__dirname, 'client')));



app.post("/api/createAccount", (req, res) => {
    console.log("Connected to React");
    const data = req.body;
    console.log(data.firstname);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/index.html'));
  });

app.listen(8000, console.log(`Server started on port ${8000}`));
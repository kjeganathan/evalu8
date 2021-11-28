'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const express = require('express');
const path = require("path");

const app = express();

app.use(express.json()); // lets you handle JSON input
//app.use(express.static('src/')); // specify the directory 

app.use(express.static(path.join(__dirname, "client/build")));



app.post("/api/createAccount", (req, res) => {
    console.log("Connected to React");
    const data = req.body;
    console.log(data.firstname);
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "client/build", "./client/public/index.html"));
// });

//serves all the 
// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "..", "./evalu8/client/build", "index.html"));
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  });

// app.use(express.static(path.join(__dirname, '../client/build', "index.html")));

const port = 3000; // specify the port 
app.listen(process.env.PORT || port);
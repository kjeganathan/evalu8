'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const express = require('express');
const app = express();

app.use(express.json()); // lets you handle JSON input
app.use(express.static('src/')); // specify the directory 

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./login'));
});


app.listen(8000, console.log(`Server started on port ${8000}`));
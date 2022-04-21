const express = require('express');
const router = express.Router();
const https = require('https');
const dblast = require("../database.js");
const app = express();

app.use(express.json());
let result = "hi";
//gets info of a single user
router.get('/github/userInfo/:user/:token', async (req, res) => {
    const user = req.params.user;
    const token = req.params.token;
    const options = {
        hostname: 'api.github.com',
        path:'/users/'+user,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36',
            'Authorization': `Bearer ${token}`
        },
        OAUth: token
    }
    https.get(options, function(apiResponse){
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Something Went Wrong!');
    });
});

//TEAM MEMBER INFO

//gets collaborator team members for repo
router.get('/github/teamInfo/:owner/:reponame/:token', async (req, res) => {
    const owner = req.params.owner;
    const reponame = req.params.reponame;
    const token = req.params.token;
    const options = {
        hostname: 'api.github.com',
        path:'/repos/'+ owner + '/' + reponame + '/collaborators',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36',
            'Authorization': `Bearer ${token}`
        },
        OAUth: token
    }
    https.get(options, function(apiResponse){
        apiResponse.pipe(res);
        //push team members to database
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Something Went Wrong!');
    });
});

//CONTRIBUTOR LIST WITH ADDITIONS, DELETIONS AND COMMIT COUNTS

//gets contributors team member for repo
router.get('/github/contributorInfo/:owner/:reponame/:token', async (req, res) => {
    const owner = req.params.owner;
    const reponame = req.params.reponame;
    const token = req.params.token;
    const options = {
        hostname: 'api.github.com',
        path:'/repos/'+ owner + '/' + reponame + '/contributors',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36',
            'Authorization': `Bearer ${token}`
        },
        OAUth: token
    }
    https.get(options, function(apiResponse){
        apiResponse.pipe(res);
        //push team members to database
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Something Went Wrong!');
    });
});

router.get('/github/commitInfo/:owner/:reponame/:token', async (req, res) => {
    const owner = req.params.owner;
    const reponame = req.params.reponame;
    const token = req.params.token;
    const options = {
        hostname: 'api.github.com',
        path:'/repos/'+ owner + '/' + reponame + '/stats/contributors',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36',
            'Authorization': `Bearer ${token}`
        },
        OAUth: token
    }
    https.get(options, function(apiResponse){
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Something Went Wrong!');
    });
});

//TASKS OR ISSUE INFORMATION

router.get('/github/issueInfo/:owner/:reponame/:state/:token', async (req, res) => {
    const owner = req.params.owner;
    const reponame = req.params.reponame;
    const state = req.params.state;
    const token = req.params.token;
    const options = {
        hostname: 'api.github.com',
        path:'/repos/'+ owner + '/' + reponame + '/issues?state=' + state,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36',
            'Authorization': `Bearer ${token}`
        },
        OAUth: token
    }
    https.get(options, function(apiResponse){
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Something Went Wrong!');
    });
});

module.exports = router;
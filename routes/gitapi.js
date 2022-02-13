const express = require('express');
const router = express.Router();
const https = require('https');

//gets info of a single user
router.get('/github/userInfo/:user', async (req, res) => {
    const user = req.params.user;
    const options = {
        hostname: 'api.github.com',
        path:'/users/'+user,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        OAUth: "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"
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
router.get('/github/teamInfo/:owner/:reponame', async (req, res) => {
    const owner = req.params.owner;
    const reponame = req.params.reponame;
    const options = {
        hostname: 'api.github.com',
        path:'/repos/'+ owner + '/' + reponame + '/collaborators',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36',
            'Authorization': 'Bearer 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'
        },
        OAUth: "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"
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
router.get('/github/contributorInfo/:owner/:reponame', async (req, res) => {
    const owner = req.params.owner;
    const reponame = req.params.reponame;
    const options = {
        hostname: 'api.github.com',
        path:'/repos/'+ owner + '/' + reponame + '/contributors',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36',
            'Authorization': 'Bearer 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'
        },
        OAUth: "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"
    }
    https.get(options, function(apiResponse){
        apiResponse.pipe(res);
        //push team members to database
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Something Went Wrong!');
    });
});

router.get('/github/commitInfo/:owner/:reponame', async (req, res) => {
    const owner = req.params.owner;
    const reponame = req.params.reponame;
    const options = {
        hostname: 'api.github.com',
        path:'/repos/'+ owner + '/' + reponame + '/stats/contributors',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        OAUth: "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"
    }
    https.get(options, function(apiResponse){
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Something Went Wrong!');
    });
});

//TASKS OR ISSUE INFORMATION

router.get('/github/issueInfo/:owner/:reponame', async (req, res) => {
    const owner = req.params.owner;
    const reponame = req.params.reponame;
    const options = {
        hostname: 'api.github.com',
        path:'/repos/'+ owner + '/' + reponame + '/issues',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        OAUth: "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"
    }
    https.get(options, function(apiResponse){
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Something Went Wrong!');
    });
});

module.exports = router;
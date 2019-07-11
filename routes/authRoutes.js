const express = require('express');
const request = require('request');
const router = express.Router();


router.post('/api/tokensignin', (req, res, next)=>{
    let id_token = req.body.id_token;

    let tokeninfoEndpoint = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + id_token;

    let options = {
        url: tokeninfoEndpoint,
        method: 'GET'
    };

    request(options, (error, response, body) => {
        if(response && response.statusCode) {
            return res.status(response.statusCode).send();
        } else {
            return res.status(400).send();
        }
    });
});

module.exports = router;
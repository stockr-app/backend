

const AWS = require('aws-sdk');
const jwtDecode = require('jwt-decode');

AWS.config.update({ region: 'us-west-2' });

var customAuth = function (req, res, next) {
    
    let id_token = req.headers.authorization;
    var decoded = jwtDecode(id_token);
    
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        // IdentityPoolId: process.env.ID_POOL,
        IdentityPoolId: 'us-west-2:477fc173-0785-47fd-98c3-a6022bcdb2ab',
        Logins: {
            'accounts.google.com': id_token
        }
    });

    AWS.config.credentials.get((error) => {
        user_id = AWS.config.credentials.identityId;
        user_name = decoded.name;
        if(user_id) {
            //authentication successful
            docClient = new AWS.DynamoDB.DocumentClient();
            next();
        } else {
            //unauthorized
            res.status(401).send();
        }
    });

};

module.exports = customAuth;
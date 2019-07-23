require("dotenv").config();
const express = require("express");
const moment = require("moment");
const _ = require("underscore");
const AWS = require("aws-sdk");


const router = express.Router();
AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:2f5d4f16-81aa-49cf-9b05-fec0923809b3',
});

AWS.config.update({ region: "us-west-2" });

docClient = new AWS.DynamoDB.DocumentClient();

const tableName = "userTable";



router.post("/api/stock", (req, res, next) => {
  let item = req.body.Item;
  item.timestamp = moment().unix();

  docClient.put(
    {
      TableName: tableName,
      Item: item
    },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(err.statusCode).send({
          message: err.message,
          status: err.statusCode
        });
      } else {
        return res.status(200).send(item);
      }
    }
  );
});
router.patch("/api/stock", (req, res, next) => {
  let item = req.body.Item;
  item.user_id = user_id;
  item.user_name = user_name;

  docClient.put(
    {
      TableName: tableName,
      Item: item,
      ConditionExpression: "#t = :t",
      ExpressionAttributeNames: {
        "#t": "timestamp"
      },
      ExpressionAttributeValues: {
        ":t": item.timestamp
      }
    },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(err.statusCode).send({
          message: err.message,
          status: err.statusCode
        });
      } else {
        return res.status(200).send(item);
      }
    }
  );
});

router.get("/api/stocks", (req, res, next) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;
  let params = {
    TableName: tableName,
    // KeyConditionExpression: "user_id = :uid",
    // ExpressionAttributeValues: {
    //   ":uid": user_id
    // },
    Limit: limit,
    ScanIndexForward: false
  };
  let startTimestamp = req.query.start ? parseInt(req.query.start) : 0;

  if (startTimestamp > 0) {
    params.ExclusiveStartKey = {
      user_id: user_id,
      timestamp: startTimestamp
    };
  }
  docClient.query(params, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(err.statusCode).send({
        message: err.message,
        status: err.statusCode
      });
    } else {
      return res.status(200).send(data);
    }
  });
});

router.get("/api/stock/:stock", (req, res, next) => {
  let stock = req.params.stock;
  let params = {
    TableName: tableName,
    IndexName: "stock-index",
    KeyConditionExpression: "stock = :stock",
    ExpressionAttributeValues: {
      ":stock": stock
    },
    Limit: 5
  };

  docClient.query(params, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(err.statusCode).send({
        message: err.message,
        status: err.statusCode
      });
    } else {
      if (!_.isEmpty(data.Items)) {
        return res.status(200).send(data.Items);
      } else {
        return res.status(404).send();
      }
    }
  });
});
router.delete("/api/stock/:timestamp", (req, res, next) => {
  let timestamp = parseInt(req.params.timestamp);
  let params = {
    TableName: tableName,
    Key: {
      user_id: user_id,
      timestamp: timestamp
    }
  };
  docClient.delete(params, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(err.statusCode).send({
        message: err.message,
        status: err.statusCode
      });
    } else {
      return res.status(200).send();
    }
  });
});
module.exports = router;
// Initialize the Amazon Cognito credentials provider

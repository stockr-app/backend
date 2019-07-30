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
  let item = req.body;
  // item.timestamp = moment().unix();

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
//get all table data 
router.get("/api/data", (req, res, next) => {
  let params = {
    TableName: tableName
  };
  let startTimestamp = req.query.start ? parseInt(req.query.start) : 0;

  if (startTimestamp > 0) {
    params.ExclusiveStartKey = {
      timestamp: startTimestamp
    };
  }
  docClient.scan(params, (err, data) => {
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
//get by user_id 
router.get("/api/:user_id", (req, res, next) => {
  let user_id = req.params.user_id
  let params = {
    TableName: tableName,
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id
    }
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
router.get("/api/stock/:premium", (req, res, next) => {
  let premium = req.params.premium;
  let params = {
    TableName: tableName,
    IndexName: "stock-index",
    KeyConditionExpression: "premium = :premium",
    ExpressionAttributeValues: {
      ":premium": premium
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
router.delete("/api/stock", (req, res, next) => {
  // let timestamp = parseInt(req.params.timestamp);
  // let user_id = req.body.user_id
  let params = {
    TableName: tableName,
    Key: {
      user_id: req.body.Item.user_id,
      timestamp: req.body.Item.timestamp
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

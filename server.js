const express = require("express");
const helmet = require("helmet");
const cors = require('cors')
const server = express();
const router = require("./routes/router.js");

server.use(express.json());
server.use(helmet());
server.use(cors())
server.use("/", router);
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
module.exports = server;

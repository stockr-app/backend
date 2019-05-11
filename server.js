const express = require("express");
const helmet = require("helmet");
const cors = require('cors')
const server = express();
const router = require("./routes/router.js");

server.use(express.json());
server.use(helmet());
server.use(cors())
server.use("/", router);

module.exports = server;

require('dotenv').config();
const server = require("./server");

const port = process.env.PORT || 8081;


server.listen(port, () => console.log(`listening to ${port}`));

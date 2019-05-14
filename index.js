require('dotenv').config();
const server = require("./server");

const port = process.env.PORT || 5000;

server.get("/", (req, res) => {
  res.send("hi");
});

server.listen(port, () => console.log(`listening to ${port}`));
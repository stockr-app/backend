const db = require("../dbConfig");

module.exports = {
  createUser: user => {
    return db("users").insert(user);

  },
  getUserById:  user => {
    return db("users")
      .where({ "users.id": user })
      .first();
  },

  getAllUsers:  () => {
    return db("users")
  },
  deleteUser: user =>{
      return db("users").where({"users.id": user}).del()
  }
};

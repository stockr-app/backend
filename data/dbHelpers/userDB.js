const db = require("../dbConfig");

module.exports = {
  createUser: user => {
    return db("users").insert(user);
  },
  getUserById: user => {
    return db("users")
      .where({ "users.id": user })
      .first();
  },

  getAllUsers: () => {
    return db("users");
  },
  updateUser: (id, changes) => {
    return db('users')
    .where({'users.id': id})
    .update(changes)
  },
  deleteUser: user => {
    return db("users")
      .where({ "users.id": user })
      .del();
  }
};

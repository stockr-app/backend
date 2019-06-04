require("dotenv").config();
const express = require("express");
const db = require("../data/dbHelpers/userDB.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await db.getAllUsers(req.body);
    res.status(200).json(users);
  } catch (error) {
    res.status(500), json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "The specified user does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "User information could not be retrieved." });
  }
});

router.post("/", (req, res) => {
  let user = req.body;

  db.createUser(user)
    .then(saved => {
      res.status(201).json(saved);
    })

    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", async (req, res) => {
  try {
    let user = await db.deleteUser(req.params.id);
    res.status(200).json({ message: "the user was deleted" });
  } catch (error) {
    res.status(500).json({ error: "User could not be deleted." });
  }
});

module.exports = router;

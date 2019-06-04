require('dotenv').config();
const express = require("express");
const bcrypt = require('bcryptjs');
const db = require("../data/dbHelpers/userDB.js");
const router = express.Router();

//get all users
router.get("/",async (req, res) => {
  try {
    const users = await db.getAllUsers(req.body);
    res.status(200).json(users);
  } catch (error) {
    res.status(500), json(error);
  }
});

//get user by id
router.get("/:id",async (req, res) => {
  try {
    const  id = req.params.id;
    const user = await db.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The specified user does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "User information could not be retrieved." });
  }
});

//create user could also be register
router.post("/", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  
    db.createUser(user)
      .then(saved => {
        res.status(201).json(saved);
      })
     
      .catch(error => {
        res.status(500).json(error);
      });
  });

  //delte user 
router.delete('/:id', async (req,res)=>{
    try{
        let user = await db.deleteUser(req.params.id);
        res.status(200).json({message:"the user was deleted"})
    }catch(error){
        res.status(500).json({ error: "User could not be deleted." });
    }
})

module.exports = router;

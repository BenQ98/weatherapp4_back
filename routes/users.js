var express = require("express");
var router = express.Router();

// const fetch = require('node-fetch');
const User = require("../models/users");

const { checkBody } = require('../modules/checkBody');

router.post("/signup", (req, res) => {
  // if (
  //   !req.body.name || !req.body.email ||
  //   !req.body.password ||
  //   req.body.name === "" ||
  //   req.body.email === "" ||
  //   req.body.password === ""
  // ) 
  if (!checkBody(req.body, ["name", "email", "password"]) ) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }
  // Check if the city has not already been added
  User.findOne({
    email: { $regex: new RegExp(`^${req.body.email}$`, "i") },
  }).then((dbData) => {
    if (dbData === null) {
      // Creates new document with weather data
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // Finally save in database
      newUser.save().then((newDoc) => {
        res.json({ result: true, Users: newDoc });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'user already exists' });
    }
  });
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // MISSING OR EMPTY FIELDS
  // if (!email || !password || email === '' || password === '') 
  if (!checkBody(req.body, ["email", "password"]) ){
    return res.json({ result: false, error: 'missing or empty fields' });
  }

  // FIND USER BY EMAIL
  User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }).then(user => {
    if (!user) {
      return res.json({ result: false, error: 'user not found' });
    }

    // CHECK PASSWORD
    if (user.password !== password) {
      return res.json({ result: false, error: 'wrong password' });
    }

    // SUCCESS
    res.json({ result: true, user });
  });
});

module.exports = router;

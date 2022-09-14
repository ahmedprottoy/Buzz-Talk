const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const mysql = require("mysql");
require("dotenv").config();

exports.signUp = async (req, res) => {
  const { userName, firstName, lastName, email, password, confirmPassword } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const searchQuery = mysql.format(
      "SELECT * FROM userInfo WHERE userName = ?",
      [userName]
    );

    const insertQuery = mysql.format(
      "INSERT INTO userInfo (userName, firstName, lastName, email, password) VALUES (?,?,?,?,?)",
      [userName, firstName, lastName, email, hashedPassword]
    );

    db.query(searchQuery, async (err, result) => {
      if (err) {
        throw err;
      } else if (result.length !== 0) {
        console.log("---User Already Exists--");
        res.json({ msg: "User Already Exists With This Name" });
      }
      // else if (password !== confirmPassword) {
      //   console.log("passwords didn't match");
      //   res.json({ msg: "Passwords didn't match'" });
      // }
      else {
        db.query(insertQuery, async (err, result) => {
          if (err) throw err;

          console.log("---New User Created---");
          res.json({ msg: "A New User Has Been Created" });
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

exports.logIn = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const searchQuery = mysql.format(
      "SELECT * FROM userInfo WHERE userName=?",
      [userName]
    );

    db.query(searchQuery, async (err, result) => {
      if (err) {
        throw err;
      }

      if (result.length == 0) {
        console.log("user doesnt exist", userName);
        res.json({ msg: "User Not Found", next: false });
      } else {
        const hashedPassword = result[0].password;
        const userID = result[0].userID;
        const validPassword = await bcrypt.compare(password, hashedPassword);

        if (validPassword) {
          console.log("---Log In Successful---");
          const user = { id: userID };
          const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 300,
          });

          req.session.user = result;
          // console.log(req.session.user);

          res.status(200).json({
            accessToken: token,
            msg: `${userName} is logged in.`,
            next: true,
            user: result[0].userName,
          });
        } else {
          console.log("---Password Incorrect----");
          res.json({ msg: `Invalid Password`, next: false });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

exports.isLoggedIn = async (req, res) => {
  if (req.session.user) {
    res.json({
      isloggedin: true,
      user: req.session.user,
    });
  } else {
    res.json({
      isloggedin: false,
    });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy();
  res.json({
    msg: "user logged out",
    isloggedin: false,
  });
};

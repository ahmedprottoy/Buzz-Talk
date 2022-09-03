const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

exports.signUp = async (req, res) => {
  const { userName, firstName, lastName, email, password, confirmPassword } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.getConnection(async (err, connection) => {
    if (err) {
      throw err;
    }

    const searchQuery = mysql.format(
      "SELECT * FROM userInfo WHERE userName = ?",
      [userName]
    );

    const insertQuery = mysql.format(
      "INSERT INTO userInfo VALUES (0,?,?,?,?,?)",
      [userName, firstName, lastName, email, hashedPassword]
    );

    try {
      connection.query(searchQuery, async (err, result) => {
        if (err) {
          throw err;
        } else if (result.length !== 0) {
          connection.release();
          console.log("---User Already Exists---");
          // res.send("User Already Exists With This Name");
          res.json({ msg: "User Already Exists With This Name" });
        } else if (password !== confirmPassword) {
          console.log("passwords didn't match");
          res.json({ msg: "Passwords didn't match'" });
        } else {
          connection.query(insertQuery, async (err, result) => {
            if (err) throw err;

            console.log("---New User Created---");
            res.json({ msg: "A New User Has Been Created" });
          });
        }
      });
    } catch (err) {
      console.log(error);
    }
  });
};

exports.logIn = async (req, res) => {
  const { userName, password } = req.body;

  db.getConnection(async (err, connection) => {
    if (err) {
      throw err;
    }

    const searchQuery = mysql.format(
      "SELECT * FROM userInfo WHERE userName=?",
      [userName]
    );

    await connection.query(searchQuery, async (err, result) => {
      if (err) throw err;

      if (result.length == 0) {
        console.log("user doesnt exist", userName);
        res.json({ msg: "user not found" });
      } else {
        const hashedPassword = result[0].password;
        const userID = result[0].userID;

        if (await bcrypt.compare(password, hashedPassword)) {
          console.log("---Log In Successful---");

          const token = jwt.sign(
            { userID },
            process.env.ACCESS_TOKEN_SECRET,
            {}
          );

          res.json({
            accessToken: token,
            msg: `${userName} is logged in.`,
          });
        } else {
          console.log("---Password Incorrect----");
          res.json({ msg: `Invalid Password` });
        }
      }
    });
  });
};

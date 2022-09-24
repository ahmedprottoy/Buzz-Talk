const db = require("../config/db");
const bcrypt = require("bcrypt");
const mysql = require("mysql");

const userBios = {};

userBios.createBios = (req, res, next) => {
  let { location, profession, religion } = req.body;
  const profileImgId = req.files.profile[0].filename;
  const coverImgId = req.files.cover[0].filename;
  console.log(req.user);
  const userId = req.user.id;

  if (!location) location = "null";
  if (!profession) profession = "null";
  if (!religion) religion = "null";

  //  try {
  const insertQuery = mysql.format(
    "INSERT INTO userbios (userId, profileImgId, coverImgId, location, profession, religion) VALUES (?,?,?,?,?,?)",
    [userId, profileImgId, coverImgId, location, profession, religion]
  );

  db.query(insertQuery, async (err, result) => {
    if (err) {
      next(err);
    } else {
      console.log("---User Bios Created---");
      res.json({ msg: "User Bios Has Been Created" });
    }
  });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ err });
  // }
};

userBios.updateProfile = async (req, res, next) => {
  console.log(req.body);
  let {
    userName,
    firstName,
    lastName,
    email,
    password,
    location,
    profession,
    religion,
  } = req.body;
  const userId = req.user.id;
  let hashedPassword = "";
  const searchSQL =
    "SELECT userName, firstName, lastName, email, password, location, profession, religion FROM socialmedia.userbios, socialmedia.userinfo where userbios.userId=userinfo.userId and userinfo.userId = ?";

  db.query(searchSQL, [userId], async (err, result) => {
    if (err) {
      next(err);
    } else if (!result) {
      res.status(500).send("There was an server side error");
    } else {
      if (!userName) userName = result[0].userName;
      if (!firstName) firstName = result[0].firstName;
      if (!lastName) lastName = result[0].lastName;
      if (!email) email = result[0].email;
      if (!location) location = result[0].location;
      if (!profession) profession = result[0].profession;
      if (!religion) religion = result[0].religion;
      if (!password) {
        hashedPassword = result[0].password;
      } else {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const profileUpdate =
        "Update userinfo set userName = ? , firstName = ? , lastName = ? , email = ?,  password = ? where userId = ?";

      db.query(
        profileUpdate,
        [userName, firstName, lastName, email, hashedPassword, userId],
        (err1, rows) => {
          if (err1) {
            next(err1);
          } else {
            const biosUpdate =
              "Update userbios set location = ? , profession = ? , religion = ? where userId = ?";

            db.query(
              biosUpdate,
              [location, profession, religion, userId],
              (err2, result) => {
                if (err2) {
                  next(err2);
                } else {
                  res.status(200).json({
                    msg: "You have successfully updated your profile",
                  });
                }
              }
            );
          }
        }
      );
    }
  });
};

userBios.getProfile = (req, res, next) => {
  const userId = req.user.id;
  const searchSQL =
    "SELECT userName,firstName,lastName,email, location, profession, religion FROM socialmedia.userbios, socialmedia.userinfo where userbios.userId=userinfo.userId and userinfo.userId = ?";
  db.query(searchSQL, [userId], (err, results) => {
    if (err) {
      next(err);
    } else if (!results) {
      res.status(500).send("There was an server side error");
    } else {
      res.status(200).send(results);
    }
  });
};

userBios.searchProfile = (req, res, next) => {
  const userId = req.params.userId;
  const searchSQL =
    "SELECT userName, firstName, lastName, email, location, profession, religion FROM socialmedia.userbios, socialmedia.userinfo where userbios.userId=userinfo.userId and userinfo.userId = ?";
  db.query(searchSQL, [userId], (err, results) => {
    if (err) {
      next(err);
    } else if (!results) {
      res.status(500).send("Could not get the user");
    } else {
      res.status(200).send(results);
    }
  });
};

module.exports = userBios;

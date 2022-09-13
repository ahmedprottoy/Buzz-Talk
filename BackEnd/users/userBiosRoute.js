const db = require("../config/db");
const mysql = require("mysql");

const userBios = {};

userBios.createBios = (req, res) => {
 let { location , profession , religion} = req.body;
 const profileImgId = req.files.profile[0].filename;
  const coverImgId = req.files.cover[0].filename;
 console.log(req.user);
 const userId = req.user.id;


 
 if(!location) location = "null";
 if(!profession) profession = "null";
 if(!religion) religion = "null";

 try {
    const insertQuery = mysql.format(
      "INSERT INTO userbios (userId, profileImgId, coverImgId, location, profession, religion) VALUES (?,?,?,?,?,?)",
      [userId, profileImgId, coverImgId, location, profession, religion]
    );

    db.query(insertQuery, async (err, result) => {
        if (err) throw err;

        console.log("---User Bios Created---");
        res.json({ msg: "User Bios Has Been Created" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }


};

module.exports = userBios;
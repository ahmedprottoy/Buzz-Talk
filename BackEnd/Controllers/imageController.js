const db = require("../config/db");

const update = {};

update.profileImg = (req, res, next) => {
  const userId = req.user.id;
  const profileImgId = req.file.filename;
  const updateSQL = "Update userbios set profileImgId = ? where userId = ?";

  db.query(updateSQL, [profileImgId, userId], (err, results) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({
        message: "You have successfully updated your profile picture",
      });
    }
  });
};

update.coverImg = (req, res, next) => {
  const userId = req.user.id;
  const coverImgId = req.file.filename;
  const updateSQL = "Update userbios set coverImgId = ? where userId = ?";

  db.query(updateSQL, [coverImgId, userId], (err, results) => {
    if (err) {
      next(err);
    } else {
      res
        .status(200)
        .json({ message: "You have successfully updated your cover picture" });
    }
  });
};

update.getImages = (req, res, next) => {
  const userId = req.user.id;
  const searchQuery =
    "SELECT profileImgId,coverImgId FROM socialmedia.userbios WHERE userbios.userId=? ";

  db.query(searchQuery, [userId], (err, results) => {
    if (err) {
      next(err);
    } else if (!results) {
      res.status(500).send("Could not get the user");
    } else {
      res.status(200).send(results);
    }
  });
};

module.exports = update;

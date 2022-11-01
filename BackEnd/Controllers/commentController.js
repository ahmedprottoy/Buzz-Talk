const db = require("../config/db");

const commentHandler = {};

commentHandler.postComment = (req, res, next) => {
  const userID = req.user.id;
  const postID = req.params.postID;
  let commentImg = "null";
  let { commentText } = req.body;

  if (!commentText) commentText = "null";
  if (req.file != undefined) commentImg = req.file.filename;

  const insertQuery =
    "insert into socialmedia.comment_table(userID, postID, commentText, commentImg) values(?, ?, ?, ?);";

  if (commentImg == "null" && commentText == "null") {
    res.json({ msg: " PLease insert something" });
  } else {
    db.query(
      insertQuery,
      [userID, postID, commentText, commentImg],
      (err, results) => {
        if (err) {
          next(err);
        } else {
          res.json({
            msg: "comment is created ! ",
          });
        }
      }
    );
  }
};

commentHandler.getComment = (req, res, next) => {
  const postID = req.params.postID;
  const searchQueary = `SELECT commentID , userName,profileImgId , commentText, commentImg FROM socialmedia.comment_table, socialmedia.userinfo,socialmedia.userbios
    where comment_table.userID = userinfo.userID and userbios.userID = userinfo.userID  and postID = ? ;`;

  db.query(searchQueary, [postID], (err, results) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = commentHandler;

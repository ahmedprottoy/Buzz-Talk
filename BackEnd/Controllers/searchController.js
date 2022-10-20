const db = require("../config/db");

const searchHandler = {};

searchHandler.userSearch = (req, res, next) =>{
    const {userName} = req.body;

    const searchQuery =
    `SELECT userName , firstName , lastName , profileImgId , profession 
FROM socialmedia.userbios ,socialmedia.userinfo
where userbios.userId = userinfo.userID and userName like '%${userName}%'
;`

if (userName == undefined) {
    res.json({ msg: " PLease insert something" });
  } else {
    db.query(searchQuery, [userName], (err, results) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(results);
      }
    });
  }

}

searchHandler.postSearch = (req, res, next) =>{
    const {postDet} = req.body;

    const searchQuery =
    `SELECT postID, userName , profileImgId , postDet, imgId, likenumber, date_time 
    FROM socialmedia.userbios ,socialmedia.userinfo, socialmeadia.post_table
    where userbios.userId = userinfo.userID and userinfo.userID = post_table.userID and postDet like '%${postDet}%';
;`

if (postDet == undefined) {
    res.json({ msg: " PLease insert something" });
  } else {
    db.query(searchQuery, [postDet], (err, results) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(results);
      }
    });
  }

}


searchHandler.userPostSearch = (req, res, next) =>{
    const {userName} = req.body;

    const searchQuery =
    `SELECT postID, userName , profileImgId , postDet, imgId, likenumber, date_time 
    FROM socialmedia.userbios ,socialmedia.userinfo, socialmedia.post_table
    where userbios.userId = userinfo.userID and userinfo.userID = post_table.userID and userName like '%${userName}%';
;`

if (userName == undefined) {
    res.json({ msg: " PLease insert something" });
  } else {
    db.query(searchQuery, [userName], (err, results) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(results);
      }
    });
  }

}


module.exports = searchHandler;
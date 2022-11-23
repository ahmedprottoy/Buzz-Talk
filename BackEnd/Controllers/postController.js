const db = require("../config/db");

const postHandler = {};

postHandler.createPost = (req, res, next) => {
  let { postDet } = req.body;
  console.log(req.body.postDet);
  console.log(req.file);

  const userID = req.user.id;
  let imgId = "null";
  const insertQuery =
    "insert into socialmedia.post_table(userID, postDet, imgId, date_time) values(?, ?, ?, now());";

  if (!postDet) postDet = "null";
  // console.log(req.file);
  if (req.file != undefined) imgId = req.file.filename;

  if (postDet == "null" && imgId == "null") {
    res.json({ msg: " PLease insert something" });
  } else {
    db.query(insertQuery, [userID, postDet, imgId], (err, results) => {
      if (err) {
        next(err);
      } else {
        res.json({
          msg: "post is created ! ",
        });
      }
    });
  }
};

postHandler.updatePost = (req, res, next) => {
  let { postDet } = req.body;
  const userID = req.user.id;
  const postID = req.params.postID;
  let imgId = "null";
  const searchQuery =
    "select * from socialmedia.post_table where postID = ? and userID = ?";
  db.query(searchQuery, [postID, userID], (err, results) => {
    if (err) {
      next(err);
    } else if (results.length == 0) {
      res.status(500).json({ message: "post doesn't exist for update" });
    } else {
      if (req.file != undefined) {
        imgId = req.file.filename;
      } else {
        imgId = results[0].imgId;
      }
      if (!postDet) postDet = results[0].postDet;

      const updateSQL =
        "update socialmedia.post_table set postDet = ? , imgId = ? where userID = ? and postID = ?";

      db.query(
        updateSQL,
        [postDet, imgId, userID, postID],
        (err1, results1) => {
          if (err) {
            next(err);
          } else {
            res.json({ message: "Update succsessful" });
          }
        }
      );
    }
  });
};

postHandler.getPost = (req, res, next) => {
  const postID = req.params.postID;
  console.log("hitting");
  console.log(postID);
  const searchQuery = `SELECT userName as Author ,profileImgId, postDet , imgID , date_time
    from socialmedia.userinfo , socialmedia.post_table,socialmedia.userbios
    where userinfo.userID = post_table.userID and userinfo.userID = userbios.userID and postID = ? ;`;

  db.query(searchQuery, [postID], (err, results) => {
    if (err) {
      next(err);
    } else if (results.length == 0) {
      res.json({ message: "post doesn't exist get" });
    } else {
      res.status(200).json(results);
    }
  });
};

postHandler.getUsersPost = (req, res, next) => {
  const userID = req.params.userID;
  const searchQuery = `SELECT init_table.postID as postID, Author ,profileImgId, postDet , imgID , date_time, commentNumber, likenumber from
  (SELECT postID, userName as Author ,profileImgId, postDet , imgID , date_time
      from socialmedia.userinfo , socialmedia.post_table,socialmedia.userbios
      where userinfo.userID = post_table.userID and userinfo.userID = userbios.userID and post_table.userID = ?) as init_table left join (Select postID , count(commentID) as commentNumber from (SELECT post_table.postID, commentID FROM socialmedia.post_table, socialmedia.comment_table where post_table.postID = comment_table.postID) as temp
  group by postID) as commentCount on init_table.postID = commentCount.postID left join (select postID, count(userID) as likenumber from socialmedia.like_table group by postID) as likeCount on init_table.postID = likeCount.postID;`;

  db.query(searchQuery, [userID], (err, results) => {
    if (err) {
      next(err);
    } else if (results.length == 0) {
      res.json({ message: "post doesn't exist for this user" });
    } else {
      res.status(200).json(results);
    }
  });
};

postHandler.getOwnPost = (req, res, next) => {
  const userID = req.user.id;
  const searchQuery = `SELECT init_table.postID as postID, Author ,imgId, postDet , imgID ,  date_time,likenumber, commentNumber from
  (SELECT userName as Author ,postId, postDet , imgID , date_time
      from socialmedia.userinfo , socialmedia.post_table
      where userinfo.userID = post_table.userID and post_table.userID = ? ) as init_table left join (Select postID , count(commentID) as commentNumber from (SELECT post_table.postID, commentID FROM socialmedia.post_table, socialmedia.comment_table where post_table.postID = comment_table.postID) as temp
  group by postID) as commentCount on init_table.postID = commentCount.postID left join (select postID, count(userID) as likenumber from socialmedia.like_table group by postID) as likeCount on init_table.postID = likeCount.postID;`;
  console.log("test");

  db.query(searchQuery, [userID], (err, results) => {
    if (err) {
      next(err);
    } else if (results.length == 0) {
      res.json({ message: "post doesn't exist for this user" });
    } else {
      res.status(200).json(results);
    }
  });
};

postHandler.deletePost = (req, res, next) => {
  const postID = req.params.postID;
  const userID = req.user.id;
  const deleteQueryComment =
    "DELETE FROM socialmedia.comment_table WHERE postID = ?;";

  db.query(deleteQueryComment, [postID], (error, results1) => {
    if (error) {
      next(error);
    } else {
      const likeID = Math.max(postID, userID) + "_" + Math.min(postID, userID);
      const deleteQueryLike =
        "DELETE FROM socialmedia.like_table WHERE postID = ?;";
      db.query(deleteQueryLike, [postID], (errorLike, results2) => {
        if (errorLike) {
          next(errorLike);
        } else {
          const deleteQueryPost =
            "DELETE FROM socialmedia.post_table WHERE userID = ? and postID = ?;";
          db.query(deleteQueryPost, [userID, postID], (err, results2) => {
            if (err) {
              next(err);
            } else {
              res.json({ message: "Delete successfull " });
            }
          });
        }
      });
    }
  });
};

postHandler.followingUserPost = (req, res, next) => {
  const userID = req.user.id;
  const searchQuery = `select Author , initi_table.postId , postDet , imgID ,  date_time , profileImgId,commentNumber, likenumber from
  (SELECT userName as Author , postId,postDet , imgID ,  date_time , profileImgId
      from socialmedia.userinfo , socialmedia.post_table ,socialmedia.userbios
      where userinfo.userID = post_table.userID and userinfo.userID = userbios.userId and post_table.userID in (select userId from socialmedia.follower_table where followerID = ?
   ) ) as initi_table Left join (select postID ,count(commentID) commentNumber from (SELECT post_table.postID, commentID FROM socialmedia.post_table, socialmedia.comment_table where post_table.postID = comment_table.postID) as temp group by temp.postID
  ) as temp on initi_table.postID = temp.postID left join (select postID, count(userID) as likenumber from socialmedia.like_table group by postID) as likeCount on initi_table.postID = likeCount.postID;`;
  //console.log("dhukse");
  db.query(searchQuery, [userID], (err, results) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = postHandler;

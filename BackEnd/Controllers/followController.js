const db = require("../config/db");

const followHandler = {};

followHandler.startFollow = (req, res, next) => {
  const followerID = req.user.id;
  const userID = req.params.userID;
  const insertQuery =
    "insert into socialmedia.follower_table( userID, followerID ) values( ?, ?)";

  db.query(insertQuery, [userID, followerID], (err, results) => {
    if (err) {
      next(err);
    } else {
      res
        .status(200)
        .json({ message: `Congrats! You just start following ${userID}` });
      // console.log(results);
    }
  });
};

followHandler.getFollower = (req, res, next) => {
  const userID = req.user.id;
  const searchQuery = `select userName, firstName, lastName, email, profileImgId
    from socialmedia.userbios,(select *
    from socialmedia.userinfo
    where userinfo.userID in  (select followerID from socialmedia.follower_table where userID = ?)) as tb
    where userbios.userId = tb.userID`;

  db.query(searchQuery, [userID], (err, results) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(results);
      // console.log(results);
    }
  });
};

followHandler.getFollowing = (req, res, next) => {
  const userID = req.user.id;
  const searchQuery = `select userName, firstName, lastName, email, profileImgId
    from socialmedia.userbios,(select *
    from socialmedia.userinfo
    where userinfo.userID in  (select userID from socialmedia.follower_table where followerID =?)) as tb
    where userbios.userId = tb.userID`;

  db.query(searchQuery, [userID], (err, results) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(results);
      // console.log(results);
    }
  });
};

followHandler.unfollow = (req, res, next) => {
  const userID = req.user.id;
  const followeeId = req.params.userID;
  const deleteQuery =
    "DELETE FROM socialmedia.follower_table WHERE userID = ? and followerID = ?;";

  db.query(deleteQuery, [followeeId, userID], (err, results) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ message: `You just unfollowed ${followeeId}` });
    }
  });
};

module.exports = followHandler;

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

//who following me
followHandler.getFollower = (req, res, next) => {
  const userID = req.user.id;
  const searchQuery = `select userbios.userId,userName, firstName, lastName, email, profileImgId,coverimgId
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

followHandler.getFollowerProfile = (req, res, next) => {
  const userID = req.params.userId;

  const searchQuery = `select userName, firstName, lastName,profileImgId,coverImgId,location,profession,religion
    from socialmedia.userbios,socialmedia.userinfo 
    where userbios.userId = userInfo.userID and
    userInfo.userID=?`;

  db.query(searchQuery, [followerID], (err, results) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(results);
      // console.log(results);
    }
  });
};

followHandler.isFollowing = (req, res, next) => {
  const followerID = req.params.followerID;
  const userID = req.user.id;

  let isFollowing = false;

  const searchQuery2 = `Select * from socialmedia.follower_table where userID=? and followerID=? `;

  db.query(searchQuery2, [userID, followerID], (err, results) => {
    if (results.length != 0) {
      isFollowing = true;
    }

    res.status(200).json(isFollowing);
  });
};

//whom i follow
followHandler.getFollowing = (req, res, next) => {
  const userID = req.user.id;
  const searchQuery = `select userbios.userId as userId,  userName, firstName, lastName, email, profileImgId
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
      res.status(200).json({ message: `you no longer follow this user` });
    }
  });
};

module.exports = followHandler;

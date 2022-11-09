const db = require("../config/db");

const likeHandler = {};

likeHandler.likePost = (req, res, next) => {

    const postID = req.params.postID;
    const userID = req.user.id;
    const likeID = postID+"_"+userID;
    const insertQuery = "INSERT INTO socialmedia.like_table (postID, userID, likeID) VALUES (?, ?, ?);";

    db.query(insertQuery, [postID, userID, likeID], (err, results) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({ msg: "liked" });
        }
    });

}

likeHandler.unlikePost = (req, res, next) => {

    const postID = req.params.postID;
    const userID = req.user.id;
    const likeID = Math.max(postID, userID)+"_"+Math.min(postID, userID);
    const deleteQuery = "Delete from socialmedia.like_table where likeID = ?;";

    db.query(deleteQuery, [likeID], (err, results) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({ msg: "unliked" });
        }
    });

}

likeHandler.isLiking = (req, res, next) => {
    const postID = req.params.postID;
    const userID = req.user.id;
    const likeID = Math.max(postID, userID)+"_"+Math.min(postID, userID);
    const searchQuery = " SELECT * FROM socialmedia.like_table where likeID = ?;";
    db.query(searchQuery, [likeID], (err, result) => {
        if(err){
            next(err);
        } else{
            if(result.length == 0){
                res.json({"isLiking" : false});
            } else{
                res.json({"isLiking" : true});
            }
        }
    });
}

module.exports = likeHandler;
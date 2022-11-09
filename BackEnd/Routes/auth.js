const express = require("express");
const authControl = require("../Controllers/authController");
const userBios = require("../users/userBiosRoute");
const { authentication } = require("../middleware/authenticateToken");
const fileUpload = require("../middleware/fileUpload");
const imgUpdate = require("../Controllers/imageController");
const followHandler = require("../Controllers/followController");
const postHandler = require("../Controllers/postController");
const searchHandler = require("../Controllers/searchController");
const commentHandler = require("../Controllers/commentController");

const chatHandler = require("../Controllers/chatController");
const likeHandler = require("../Controllers/likeController");


const router = express.Router();
//
//
//
//SIGNUP,LOGIN
router.post("/signUp", authControl.signUp);
router.post("/logIn", authControl.logIn);
router.get("/isLoggedIn", authControl.isLoggedIn);
router.get("/logout", authControl.logout);
//
//
//
//USER INFO,BIO
//
//
//
router.post(
  "/user/bios",
  authentication,
  fileUpload.upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  userBios.createBios
);

router.put("/profileUpdate", authentication, userBios.updateProfile);
router.get("/user/profile", authentication, userBios.getProfile);

router.get("/user/:userId", authentication, userBios.searchProfile);
//
//
//
//IMAGE
//
//
//
router.post(
  "/profileImg",
  authentication,
  fileUpload.upload.single("profile"),
  imgUpdate.profileImg
);
router.put(
  "/coverImg",
  authentication,
  fileUpload.upload.single("cover"),
  imgUpdate.coverImg
);

router.get("/getImages", authentication, imgUpdate.getImages);
// router.get("/user/getImage", authentication, imgUpdate.getImage);
router.use("/images", express.static("./images"));
//
//
//
//FOLLOWERS
//
//
//
router.post("/follow/:userID", authentication, followHandler.startFollow);
router.get("/following", authentication, followHandler.getFollowing);
//router.get("/follower", authentication, followHandler.getFollower);(eitar dorkar apatoto nai)
router.delete("/unfollow/:userID", authentication, followHandler.unfollow);
router.get(
  "/user/getFollowerProfile/:userId",
  authentication,
  followHandler.getFollowerProfile
);

router.get(
  "/user/isFollowing/:followerID",
  authentication,
  followHandler.isFollowing
);
//
//
//
//POST
//
//
//

router.get("/getOwnPost", authentication, postHandler.getOwnPost);
router.post(
  "/createPost",
  authentication,
  fileUpload.upload.single("image"),
  postHandler.createPost
);
router.put(
  "/post/:postID",
  authentication,
  fileUpload.upload.single("post"),
  postHandler.updatePost
);
router.get("/post/:postID", authentication, postHandler.getPost);
router.delete("/post/:postID", authentication, postHandler.deletePost);
router.get("/post/user/:userID", authentication, postHandler.getUsersPost);
router.get("/follower/post", authentication, postHandler.followingUserPost);
router.get(
  "/search/user/account/:userName",
  authentication,
  searchHandler.userSearch
);
router.get("/search/user/post", authentication, searchHandler.userPostSearch);
router.get("/search/post", authentication, searchHandler.postSearch);
router.post(
  "/comment/:postID",
  authentication,
  fileUpload.upload.single("commentImg"),
  commentHandler.postComment
);
router.get("/comment/:postID", authentication, commentHandler.getComment);
router.get("/getconvo",authentication,chatHandler.getConversations);
router.post("/getconvo/:userID",authentication,chatHandler.createConversation);
router.get("/getmessage/:userID",authentication,chatHandler.getMessages);
router.post("/like/:postID",authentication,likeHandler.likePost);
router.delete("/unlike/:postID",authentication,likeHandler.unlikePost);
router.get("/isLike/:postID",authentication,likeHandler.isLiking);
router.get("/findConvoersation/:userID",authentication,chatHandler.findConversation);

router.use("/images", express.static("images"));

router.use((req, res) => {
  res.status(404).send("URL doesn't exist.");
});

module.exports = router;

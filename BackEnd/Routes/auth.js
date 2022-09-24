const express = require("express");
const authControl = require("../Controllers/authController");
const userBios = require("../users/userBiosRoute");
const { authentication } = require("../middleware/authenticateToken");
const fileUpload = require("../middleware/fileUpload");
const imgUpdate = require("../Controllers/imageController");
const followHandler = require("../Controllers/followController");
const postHandler = require("../Controllers/postController");

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
router.put(
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
router.get("/follower", authentication, followHandler.getFollower);
router.delete("/follow/:userID", authentication, followHandler.unfollow);
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

router.use("/images", express.static("images"));

router.use((req, res) => {
  res.status(404).send("URL doesn't exist.");
});

module.exports = router;

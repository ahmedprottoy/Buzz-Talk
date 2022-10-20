const express = require("express");
const authControl = require("../Controllers/authController");
const userBios = require("../users/userBiosRoute");
const { authentication } = require("../middleware/authenticateToken");
const fileUpload = require("../middleware/fileUpload");
const imgUpdate = require("../Controllers/imageController");
const followHandler = require("../Controllers/followController");
const postHandler = require("../Controllers/postController");
const searchHandler = require("../Controllers/searchController");
const commentHandler = require("../Controllers/commentController")

const router = express.Router();

router.post("/signUp", authControl.signUp);
router.post("/logIn", authControl.logIn);
router.get("/isLoggedIn", authControl.isLoggedIn);
router.get("/logout", authControl.logout);

router.post(
  "/user/bios",
  authentication,
  fileUpload.upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  userBios.createBios
);



router.post("/user/bios",authentication,fileUpload.upload.fields([
    { name:"profile" , maxCount: 1},
    { name: "cover", maxCount: 1}
]),userBios.createBios);
router.put("/user",authentication,userBios.updateProfile);
router.get("/user",authentication,userBios.getProfile);
router.get("/user/:userId",authentication,userBios.searchProfile);
router.put("/profileimg",authentication,fileUpload.upload.single("profile"), imgUpdate.profileImg);
router.put("/coverimg",authentication,fileUpload.upload.single("cover"), imgUpdate.coverImg);
router.use('/images', express.static('./images'));
router.post("/follow/:userID",authentication,followHandler.startFollow);
router.get("/following",authentication,followHandler.getFollowing);
router.get("/follower",authentication,followHandler.getFollowing);
router.delete("/follow/:userID",authentication,followHandler.unfollow);
router.post("/post", authentication, fileUpload.upload.single("post"), postHandler.createPost);
router.put("/post/:postID", authentication, fileUpload.upload.single("post"), postHandler.updatePost);
router.get("/post/:postID", authentication, postHandler.getPost);
router.delete("/post/:postID", authentication, postHandler.deletePost);
router.get("/post/user/:userID", authentication, postHandler.getUsersPost);
router.get("/follower/post", authentication, postHandler.followingUserPost);
router.get("/search/user/account", authentication, searchHandler.userSearch);
router.get("/search/user/post", authentication, searchHandler.userPostSearch);
router.get("/search/post", authentication, searchHandler.postSearch);
router.post("/comment/:postID",authentication,fileUpload.upload.single("commentImg"),commentHandler.postComment);
router.get("/comment/:postID", authentication, commentHandler.getComment);



router.use((req,res) => {
    res.status(404).send("URL doesn't exist.");
});


module.exports = router;

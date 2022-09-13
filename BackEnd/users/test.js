const multer = require("multer");
const test = {};



test.getapi = (req , res) => {
    const profileImgId = req.files.profile[0].filename;
    const coverImgId = req.files.cover[0].filename;
    console.log(profileImgId,coverImgId);
    //console.log(req.files);
    let {userId} = req.body;
    if(!userId) userId = "null1";
    console.log(userId);
    res.send("hello boys");
}

module.exports = test;
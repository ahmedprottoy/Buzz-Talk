const multer = require("multer");
const path = require("path");
const fileUpload = {};

const upload_dest = "./images/";

const storage = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null,upload_dest)
    },
    filename: (req , file  , cb) =>{
        cb(null , Date.now()+path.extname(file.originalname))
    }
})

fileUpload.upload = multer({storage : storage});

module.exports = fileUpload;
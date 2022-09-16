const multer = require("multer");
const db = require("../config/db");
const test = {};



test.getapi = (req , res,next) => {
    const searchSQL = "SELECT userName, firstName, lastName, email, password, location, profession, religion FROM socialmedia.userbios, socialmedia.userinfo where userbios.userId=userinfo.userId and userinfo.userId = ?";
    try{
      db.query(searchSQL,[req.user.id],(err, result) => {
        if (err) {
            a=5;
          res.status(500).json({ message:"An error occurd!!!\nCheck your request again." });
          console.log(err);

        }else{
            console.log(result[0]);
            
            res.json(a);
        }
        
      });
    } catch(err1){
      next(err1)
    }
    
      
}

module.exports = test;
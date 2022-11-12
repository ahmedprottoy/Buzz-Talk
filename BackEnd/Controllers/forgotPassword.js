const resetHandler = {};
const nodemailer = require("nodemailer");
const db = require("../config/db");
const bcrypt = require("bcrypt");


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: "hossainsazzad31415@gmail.com",
        pass:"gkndmdhnixhcdzxy"
    },
    tls : {
        rejectUnauthorized:false
    }
})




resetHandler.forgotPassword = (req,res,next) => {
    
    let code = Math.floor((Math.random()*90000)+10000);
    const {email} = req.body;
    console.log(email);
    let mailOption = {
        from: "hossainsazzad31415@gmail.com",
        to: email.toString(),
        subject: "reset code",
        text:`reset code for intouch is  ${code}`
    };
    

    const insertQuery = `insert into auth_table values(?,?)`;
        transporter.sendMail(mailOption, (err,success) => {
            console.log("ll");
            if(err){
                next(err);
                
            }else{
                
                db.query(insertQuery,[email, code], (err,results) => {
                    if(err){
                        next(err);
                    }else{
                        res.json({msg: `success : ${code}`});
                    }
                })
            }
        })
}

resetHandler.authenticate =(req,res,next) => {

    const { code } = req.body;
    const {email} = req.body;
    const searchQuery = `select * from socialmedia.auth_table where email = ? and code = ?`;
    console.log(typeof(code),typeof(parseInt(code)),typeof(email) );
    db.query(searchQuery,[email, parseInt(code)], (err,result) => {
        if(err){
            next(err);
        }else if(result.length === 0){
            res.json({msg:"unauthorized"});
        }else{
            res.json({msg:"successfull"});
        }
    })
}

 resetHandler.resetPassword = async (req, res, next) => {

    const {email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const searchQuery = `select userID from socialmedia.userinfo where email = ?`;
    db.query(searchQuery,[email],(err,results) => {
        if(err){
            next(err);
        }else{
            const userID = results[0].userID;
            const updateQuery = `update socialmedia.userinfo
            set password = ? where userID = ?;`
            db.query(updateQuery, [hashedPassword,userID], (errUpdate,resultUpdate) => {
                if(errUpdate){
                    next(errUpdate);
                }else{
                    res.json({msg:"successful"});
                }
            })
        }
    }) 



}

module.exports = resetHandler;
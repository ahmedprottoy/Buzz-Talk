const errHandler =  {};

errHandler.handle = (err, req, res, next) => {

    if(res.headersSent){
        next("there was a problem");
    } else{
        if(err.message){
            res.status(500).send(err.message);
        }else{
            res.status(500).send("There was a an error on server side")
        }
    }

}

module.exports = errHandler;
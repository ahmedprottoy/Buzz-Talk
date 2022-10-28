const jwt = require("jsonwebtoken");
const authToken = {};

authToken.authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  //console.log(req.headers);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    //console.log(req.user.id);
    next();
  });
};

module.exports = authToken;

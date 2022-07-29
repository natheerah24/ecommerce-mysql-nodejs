const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  //Get token from request header
  const token = req.header("x-auth-token");

  //Check if not token is valid
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied" });
  }

  try {
    // Decoding the token and getting user attached to the token
    const decoded = jwt.verify(token, process.env.jwtSecret);

    // Storing User data in req.user
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

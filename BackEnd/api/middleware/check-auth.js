const jwt = require("jsonwebtoken");
// require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    await next();
  } catch (error) {
    return res.status(401).json({
      error: error,
      message: "Auth Failed",
    });
  }
};

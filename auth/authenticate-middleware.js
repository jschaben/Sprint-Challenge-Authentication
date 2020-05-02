/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secret");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const secret = secrets.jwtSecret;

  if(token) {
   
      jwt.verify(token, secret, (error, decodedToken) => {
      
          if (error) {
              res.status(401).json({ message: 'Invalid token'})
          } else {
             
              req.decodedToken = decodedToken;
              next();
          }
      });
 
  } else {
      res.status(400).json({errorMessage: 'Please provide credentials.'});
  }
};
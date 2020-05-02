const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/userModel");
const { jwtSecret } = require("../config/secrets");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res
        .status(201)
        .json({ message: `Thanks for signing up, ${saved.username}!` });
    })
    .catch(err => res.status(500).json({ message: "Error signing up" }));
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome, ${user.username}!`, token });
      } else {
        res
          .status(401)
          .json({ message: "No account found with that information" });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Log in error, please try again." })
    );
});

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "3h"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
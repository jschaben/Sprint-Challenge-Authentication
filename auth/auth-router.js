const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 


const Users = require('../users/users-model');
const secrets = require('../config/secret');


function generateToken(user) {
  
    const payload = {
        userId: user.id,
        username: user.username,
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, secret, options);
}

router.post('/register', (req, res) => {
    
    let user = req.body;

    const rounds = process.env.HASH_ROUNDS || 8;

    const hash = bcrypt.hashSync(user.password, rounds);
  
    user.password = hash;

    Users.add(user)
        .then(saved => {
       
            res.status(201).json(saved);
        })
        .catch(error => {
          
            res.status(500).json({ errorMessage: error.message});
        });
});


router.post('/login', (req, res) => {

    let { username, password } = req.body;

    Users.findBy({username})
        .then(([user]) => {
           
            if (user && bcrypt.compareSync(password, user.password)) {
               
                const token = generateToken(user);

                
                res.status(200).json({message: 'Successfully logged in!', token});
            } else {
               
                res.status(401).json({message: 'Incorrect password.'});
            }
        })
        
        .catch(err => {
            res.status(500).json({errorMessage: err.message});
        });
});


module.exports = router;
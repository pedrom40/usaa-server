const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {User} = require('../users/models');
const config = require('../config');

const createAuthToken = user => {
    return jwt.sign({user}, config.JWT_SECRET, {
        subject: user.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};

const router = express.Router();

router.post('/login', jsonParser, (req, res) => {
  let user;
  User
    .findOne({username: req.body.username})
    .then(_user => {
      user = _user;
      if (!user) {
        return res.status(401).send({
          reason: 'LoginError',
          message: 'Incorrect username or password.'
        });
      }
      return user.validatePassword(req.body.password);
    })
    .then( () => {
      const authToken = createAuthToken(user.apiRepr());
      res.json({
        authToken: authToken,
        username: user.username
      });
    })
    .catch(error => {console.log(error);
      return res.status(401).send({
        reason: 'LoginError',
        message: 'Incorrect username or password'
      });
    });
});

// The user exchanges an existing valid JWT for a new one with a later expiration
router.post('/refresh', passport.authenticate('jwt', {session: false}), (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = {router};

var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { loginUser, restoreUser, requireUser } = require('../../config/passport')
const { isProduction } = require('../../config/keys')
const validateRegisterInput = require('../../validations/register')
const validateLoginInput = require('../../validations/login');
const { request } = require('../../app');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  })
});

// Sign up user
router.post('/register', validateRegisterInput, async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  })

  if (user) {
    const err = new Error("Validation")
    err.statusCode = 400

    const errors = {}
    if(user.email === req.body.email){
      errors.email = "That email has already been taken"
    }
    if(user.username === req.body.username) {
      errors.username = "That username has already been taken"
    }

    err.errors = errors
    return next(err)
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  })

  bcrypt.genSalt(10, (err, salt) => {
    if(err) throw err
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if(err) throw err
      try {
        newUser.hashedPassword = hashedPassword
        const user = await newUser.save()
        return res.json(await loginUser(user))
      }
      catch(err) {
        next(err)
      }
    })
  })
})

// Login user
router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

// Get current logged in user
router.get('/current', restoreUser, (req, res) => {
  if(!isProduction){
    const csrfToken = req.csrfToken()
    res.cookie("CSRF-TOKEN", csrfToken)
  }
  if(!req.user) return res.json(null)
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    following: req.user.following,
    likedPosts: req.user.likedPosts,
    profilePhoto: req.user.profilePhoto,
    profileBio: req.user.profileBio
  })
})

router.patch('/follow', requireUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    user.following.set(req.body.userId, true)
    await user.save()
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      following: user.following,
      likedPosts: user.likedPosts,
      profilePhoto: user.profilePhoto,
      profileBio: user.profileBio
    })
  } catch (err) {
    next(err)
  }
})

router.patch('/unfollow', requireUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    const resUser = await User.findById(req)
    user.following[req.body.userId].delete()
    await user.save()
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      following: user.following,
      likedPosts: user.likedPosts,
      profilePhoto: user.profilePhoto,
      profileBio: user.profileBio
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router;

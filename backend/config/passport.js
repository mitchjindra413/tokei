const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const { secretOrKey } = require('./keys')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

passport.use(new LocalStrategy({
    session: false,
    usernameField: 'email',
    passwordField: 'password',
    },
    async function(credential, password, done) {
        let user = await User.findOne({ email: credential })
        console.log('1', user)
        if(!user) {
            user = await User.findOne({ username: credential })
            console.log('2', user)
        }
        if(user){
            bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
                if(err || !isMatch) done(null, false)
                else done(null, user)
            })
        } else {
            done(null, false)
        }
    }
))

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = secretOrKey

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try{
        const user = await User.findById(jwtPayload._id)
        if(user){
            return done(null, user)
        }

        return done(null, false)
    } catch(err) {
        done(err)
    }
}))

exports.requireUser = passport.authenticate('jwt', { session: false })

exports.restoreUser = (req, res, next) => {
    return passport.authenticate('jwt', {session: false}, function(err, user) {
        if(err) return next(err)
        if(user) req.user = user
        next()
    })(req, res, next)
}

exports.loginUser = async function (user) {
    const found = await User.findById(user._id)
        .populate('following.$*', 'username profilePhoto')

    userInfo = {
        _id: found._id,
        username: found.username,
        email: found.email,
        following: found.following,
        likedPosts: found.likedPosts,
        profilePhoto: found.profilePhoto,
        profileBio: found.profileBio
    }

    // const userInfo = {
    //     _id: user._id,
    //     username: user.username,
    //     email: user.email
    // }
    const token = await jwt.sign(
        userInfo, 
        secretOrKey, 
        // { expiresIn: 3600 } // tell the key to expire in one hour
    )
    return {
        user: userInfo,
        token
    }
}

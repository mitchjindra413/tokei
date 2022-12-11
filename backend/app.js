var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const debug = require('debug')

const cors = require('cors')
const { isProduction } = require('./config/keys')

const csurf = require('csurf')

//Models
require('./models/User')

//Passport
require('./config/passport')
const passport = require('passport')

//Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
const videosRouter = require('./routes/api/videos')
const csrfRouter = require('./routes/api/csrf')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())

if (!isProduction){
    app.use(cors())
}

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

//Routers
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/videos', videosRouter)
app.use('/api/csrf', csrfRouter)

//Error handeling
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.statusCode = 404
    next(err)
})

const serverErrorLogger = debug('backend:error')

app.use((err, req, res, next) => {
    serverErrorLogger(err)
    const statusCode = err.statusCode || 500
    res.status(statusCode)
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    })
})

module.exports = app;

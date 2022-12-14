var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const debug = require('debug')
const multer = require('multer')

const cors = require('cors')
const { isProduction } = require('./config/keys')

const csurf = require('csurf')

//Models
require('./models/User')
require('./models/Post')
// require('./models/Comment')

//Passport
require('./config/passport')
const passport = require('passport')

//Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
const postsRouter = require('./routes/api/posts')
const csrfRouter = require('./routes/api/csrf')
const commentRouter = require('./routes/api/comments')

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
app.use('/api/posts', postsRouter)
app.use('/api/csrf', csrfRouter)
app.use('./api/comments', commentRouter)

//Error handeling
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.statusCode = 404
    next(err)
})

// app.use((error, req, res, next) => {
//     if (error instanceof multer.MulterError) {
//         if (error.code === "LIMIT_FILE_SIZE") {
//             return res.status(400).json({
//                 message: "file is too large",
//             })
//         }

//         if (error.code === "LIMIT_FILE_COUNT") {
//             return res.status(400).json({
//                 message: "File limit reached",
//             })
//         }

//         if (error.code === "LIMIT_UNEXPECTED_FILE") {
//             return res.status(400).json({
//                 message: "File must be an image",
//             })
//         }
//     }
// })

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

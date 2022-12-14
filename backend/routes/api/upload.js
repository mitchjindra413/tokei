var express = require('express');
const { MulterError } = require('multer');
var router = express.Router();
const multer = require('multer')
const app = express()
const s3Upload = require('../../config/s3Service')

const storage = multer.memoryStorage()

const upload = multer({storage, fileFilter, limits: {fileSize: 250000000, files: 1} })

router.post('/video', upload.single('video'), async (req, res, next) => {
    const result = await s3Upload('video')
    res.json({status: "success"})
});

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "file is too large",
            })
        }

        if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                message: "File limit reached",
            })
        }

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                message: "File must be an image",
            })
        }
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'video/mp4'){
        cb(null, true)
    } else {
        cb(new Error('File must be MP4 format'), false)
    }
}


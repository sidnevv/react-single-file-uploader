const multer = require('multer')
const path = require("path");
const {v4: uuidv4} = require('uuid')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        // cb(null, uuidv4() + path.extname(file.originalname))
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage,
    // fileFilter: (req, file, cb) => {
    //     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    //         return cb(new Error('Only image are allowed'))
    //     }
    //     cb(null, true)
    // }
})

module.exports = upload
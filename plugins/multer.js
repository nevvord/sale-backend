const multer = require('multer')

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || 'image/png') {
        cb(null, true);
    }
    cb(null, false);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().valueOf() + file.originalname);
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1920 * 1080 * 5
    },
    fileFilter: fileFilter
})

module.exports = upload
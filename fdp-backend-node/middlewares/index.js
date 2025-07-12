const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

exports.uploadImg = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads/',
        filename: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" ||
                file.mimetype == "image/jpeg" || file.mimetype == "video/mp4") {
                cb(null, Date.now() + path.extname(file.originalname));
            } else {
                cb("Error: Invalid filetype");
            }
        }
    })
}).single('file');

exports.validateToken = (req, res, next) => {
    let authToken = req.headers.authorization;
    if (authToken) {
        authToken = authToken.split(' ')[1]; // Bearer <token>

        try {
            req.userDetails = jwt.verify(authToken, process.env.KEY);
            next();
        } catch (err) {
            res.status(403).json({ success: false, message: "Invalid auth token" });
        }
    } else {
        res.status(403).json({ success: false, message: "Token required" });
    }
}
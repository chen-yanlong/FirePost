const multer = require('multer');

// store photos in ./uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Directory where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Generate unique filename
    }
});
export const upload = multer({ storage: storage });



const multer = require('multer');


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 5)
    cb(null, uniqueSuffix + file.originalname)
  }
})

const upload = multer({
  storage: storage
})

const uploadImage = upload.single('image');


module.exports = uploadImage;
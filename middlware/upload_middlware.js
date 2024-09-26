import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({
  storage: storage,
  // limits: { fileSize: 20 * 1024 * 1024 }, 
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(file.mimetype);

    if (extName) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  },
}).array('images', 5); 

export const uploadImages = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map(file => file.path); 
    }
    next(); 
  });
};

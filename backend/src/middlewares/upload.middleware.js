import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },
  filename: (req, file, cb) => {
    const files = Date.now()
    cb(null, `${files}-${file.originalname}`)
  },
});

const upload = multer({storage})

export default upload
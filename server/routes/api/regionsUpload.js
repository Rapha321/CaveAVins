const express = require('express')
const router = express.Router()
const multer = require("multer");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

var storage = multer.diskStorage({
  destination: "../../../client/src/images/regions",
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

var upload = multer({ storage: storage }).array('file');

app.post('/upload', function(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } 
    return res.status(200).send(req.file)
  })
});


module.exports = router

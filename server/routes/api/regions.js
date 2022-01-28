// import * as path from 'path';
const express = require('express')
const router = express.Router()
const multer = require("multer");
const Region = require('../../models/Region')
const app = express();
const path = require('path')

router.get('/test', (req, res) => res.json({msg: 'backend works'}))

const uploadFilePath = path.resolve(__dirname, '../../..', 'client/src/images/regions');

const cors = require("cors");
app.use(express.json());
app.use(cors());


var storage = multer.diskStorage({
  destination: uploadFilePath,
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file');


// @route GET /api/regions
// @desc Get regions (public)
router.get('/', (req, res) => {
  Region.find()
    .then(info => res.json(info))
    .catch(err => res.status(404).json({msg: 'no regions found'}))
})

// @route POST /api/regions
// @desc Create new region (public)
router.post('/', (req, res) => {
  const newRegion = new Region({
    nomRegion: req.body.nomRegion,
    imgRegion: req.body.imgRegion,
    descrRegion: req.body.descrRegion,
  })

  console.log("newRegion", newRegion)
  newRegion.save().then(info => res.json(info))
})


router.post('/uploads', function(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } 
    return res.status(200).send(req.file)
  })
});


// @route DELETE /api/regions
// @desc Delete region (public)
router.delete('/', (req, res) => {
  Region.findOneAndRemove({_id: req.body.id}).then(() => {
    res.json({success: true})
  })
})

// @route UPDATE /api/regions/update/:id
// @desc Update region (public)
router.post('/update/:id', (req, res) => {
  Region.findOneAndUpdate(
    {_id: req.params.id},
    {
      $set: {
        nomRegion: req.body.nomRegion,
        imgRegion: req.body.imgRegion,
        descrRegion: req.body.descrRegion,
      },
    },
    {new: true},
  )
    .then(info => {
      res.json(info)
    })
    .catch(err => res.status(400).json({msg: 'update failed'}))
})

module.exports = router

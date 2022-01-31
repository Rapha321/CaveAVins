const express = require('express')
const router = express.Router()
const multer = require("multer");
const app = express();
const path = require('path')
const Vins = require('../../models/Vins')

router.get('/test', (req, res) => res.json({msg: 'backend works'}))

const uploadFilePath = path.resolve(__dirname, '../../..', 'client/src/images/vins');

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

// @route GET /api/vins
// @desc Get vins (public)
router.get('/', (req, res) => {
  Vins.find()
    .then(info => res.json(info))
    .catch(err => res.status(404).json({msg: 'no vins found'}))
})

// @route POST /api/vins
// @desc Create new vins (public)
router.post('/', (req, res) => {
  const newVins = new Vins({
    regionID: req.body.regionID,
    nom: req.body.nom,
    prix: req.body.prix,
    quantity: req.body.quantity,
    descrVins: req.body.descrVins,
    imgVins: req.body.imgVins
  })

  newVins.save().then(info => res.json(info))
})

router.post('/uploads', function(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } 
    return res.status(200).send(req.file)
  })
});

// @route DELETE /api/vins
// @desc Delete vins (public)
router.delete('/', (req, res) => {
  Vins.findOneAndRemove({_id: req.body.id}).then(() => {
    res.json({success: true})
  })
})

// @route UPDATE /api/vins/update/:id
// @desc Update vins (public)
router.post('/update/:id', (req, res) => {
  Vins.findOneAndUpdate(
    {_id: req.params.id},
    {
      $set: {
        nom: req.body.nom,
        prix: req.body.prix,
        quantity: req.body.quantity
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

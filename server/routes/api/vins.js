const express = require('express')
const router = express.Router()

const Vins = require('../../models/Vins')

router.get('/test', (req, res) => res.json({msg: 'backend works'}))

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
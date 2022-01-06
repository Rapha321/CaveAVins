const express = require('express')
const router = express.Router()

const Panier = require('../../models/Panier')

router.get('/test', (req, res) => res.json({msg: 'backend works'}))

// @route GET /api/paniers
// @desc Get paniers (public)
router.get('/', (req, res) => {
  Panier.find()
    .then(info => res.json(info))
    .catch(err => res.status(404).json({msg: 'no panier found'}))
})

// @route POST /api/paniers
// @desc Create new panier (public)
router.post('/', (req, res) => {
  const newPanier = new Panier({
    clientID: req.body.clientID,
    vinsID: req.body.vinsID,
    quantity: 1
  })

  newPanier.save().then(info => res.json(info))
})

// @route DELETE /api/paniers
// @desc Delete panier (public)
router.delete('/', (req, res) => {
  Panier.findOneAndRemove({_id: req.body.id}).then(() => {
    res.json({success: true})
  })
})

// @route UPDATE /api/paniers/update/:id
// @desc Update panier (public)
router.post('/update/:id', (req, res) => {
  Panier.findOneAndUpdate(
    {_id: req.params.id},
    {
      $set: {
        clientID: req.body.clientID,
        vinsID: req.body.vinsID,
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
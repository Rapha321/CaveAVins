const express = require('express')
const router = express.Router()

const Region = require('../../models/Region')

router.get('/test', (req, res) => res.json({msg: 'backend works'}))

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
    nom: req.body.nom
  })

  console.log("newRegion", newRegion)

  newRegion.save().then(info => res.json(info))
})

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
        nom: req.body.nom
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
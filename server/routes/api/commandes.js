const express = require('express')
const router = express.Router()

const Commande = require('../../models/Commande')

router.get('/test', (req, res) => res.json({msg: 'backend works'}))

// @route GET /api/commandes
// @desc Get commandes (public)
router.get('/', (req, res) => {
  Commande.find()
    .then(info => res.json(info))
    .catch(err => res.status(404).json({msg: 'no commande found'}))
})

// @route POST /api/commandes
// @desc Create new commande (public)
router.post('/', (req, res) => {
  const newCommande = new Commande({
    date: Date(),
    clientID: req.body.clientID,
    item: req.body.item,
    status: req.body.status
  })

  console.log("newCommande", newCommande)

  newCommande.save().then(info => res.json(info))
})

// @route DELETE /api/commandes
// @desc Delete commande (public)
router.delete('/', (req, res) => {
  Commande.findOneAndRemove({_id: req.body.id}).then(() => {
    res.json({success: true})
  })
})

// @route UPDATE /api/commandes/update/:id
// @desc Update commande (public)
router.post('/update/:id', (req, res) => {
  Commande.findOneAndUpdate(
    {_id: req.params.id},
    {
      $set: {
        quantity: req.body.quantity,
        item: req.body.item,
        status: req.body.status
      }
    },
    {new: true},
  )
    .then(info => {
      res.json(info)
    })
    .catch(err => res.status(400).json({msg: 'update failed'}))
})

module.exports = router
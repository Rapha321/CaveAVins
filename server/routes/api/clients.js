const express = require('express')
const router = express.Router()

const Client = require('../../models/Client')

router.get('/test', (req, res) => res.json({msg: 'backend works'}))

// @route GET /api/clients
// @desc Get clients (public)
router.get('/', (req, res) => {
  Client.find()
    .then(info => res.json(info))
    .catch(err => res.status(404).json({msg: 'no clients found'}))
})

// @route POST /api/clients
// @desc Create new client (public)
router.post('/', (req, res) => {
  const newClient = new Client({
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    typeCarte: req.body.typeCarte,
    numeroCarte: req.body.numeroCarte,
    email: req.body.email,
    password: req.body.password
  })

  console.log("newClient", newClient)

  newClient.save().then(info => res.json(info))
})

// @route DELETE /api/clients
// @desc Delete client (public)
router.delete('/', (req, res) => {
  Client.findOneAndRemove({_id: req.body.id}).then(() => {
    res.json({success: true})
  })
})

// @route UPDATE /api/clients/update/:id
// @desc Update client (public)
router.post('/update/:id', (req, res) => {
  Client.findOneAndUpdate(
    {_id: req.params.id},
    {
      $set: {
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        typeCarte: req.body.typeCarte,
        numeroCarte: req.body.numeroCarte,
        email: req.body.email,
        password: req.body.password
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
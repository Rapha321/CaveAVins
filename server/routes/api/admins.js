const express = require('express')
const router = express.Router()

const Admin = require('../../models/Admin')

router.get('/test', (req, res) => res.json({msg: 'backend works'}))

// @route GET /api/admin
// @desc Get admins (public)
router.get('/', (req, res) => {
  Admin.find()
    .then(info => res.json(info))
    .catch(err => res.status(404).json({msg: 'no admin found'}))
})

// @route POST /api/admins
// @desc Create new admin (public)
router.post('/', (req, res) => {
  const newAdmin = new Admin({
    email: req.body.email,
    password: req.body.password
  })

  console.log("newAdmin", newAdmin)

  newAdmin.save().then(info => res.json(info))
})

// @route DELETE /api/admins
// @desc Delete admin (public)
router.delete('/', (req, res) => {
  Admin.findOneAndRemove({_id: req.body.id}).then(() => {
    res.json({success: true})
  })
})

// @route UPDATE /api/admins/update/:id
// @desc Update admin (public)
router.post('/update/:id', (req, res) => {
  Admin.findOneAndUpdate(
    {_id: req.params.id},
    {
      $set: {
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
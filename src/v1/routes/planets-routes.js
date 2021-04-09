const express = require('express')
const router = express.Router()

router.get('/:id?', function (req, res) {
  if (req.params.id) res.send(`Hello World planet with id: ${req.params.id}`)
  res.send('Hello World planet!')
})

router.post('/', function (req, res) {
  res.send('Hello World post!')
})

router.put('/:id', function (req, res) {
  res.send('Hello World put!')
})

router.delete('/:id', function (req, res) {
  res.send('Hello World delete!')
})

module.exports = router

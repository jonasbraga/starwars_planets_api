const express = require('express')
const { adaptRoute } = require('../adapters/http-routes-adapter')
const router = express.Router()
const {
  createPlanetController,
  listPlanetController,
  updatePlanetController,
  deletePlanetController
} = require('../controllers/planet')

router.post('/', adaptRoute(createPlanetController))

router.get('/:id?', adaptRoute(listPlanetController))

router.put('/:id', adaptRoute(updatePlanetController))

router.delete('/:id', adaptRoute(deletePlanetController))

module.exports = { planetsRoutes: router }

const { Planet } = require('../../models/planet-model')
const httpResponse = require('../../helpers/http-response-helper')
const { getPlanetRelatedFilms, hasValidFields } = require('../../helpers/create-update-planet-helper')

const handle = async httpRequest => {
  try {
    const {
      bodyParams: { name, climate, terrain }
    } = httpRequest

    const planetData = { name, climate, terrain }

    const { valid, missingFields } = hasValidFields(planetData)
    if (!valid) return httpResponse.badRequest({ message: `Missing fields: ${missingFields.join(', ')}` })

    const planetExistis = await Planet.find({ name })
    if (planetExistis.length) return httpResponse.conflict({ message: `Planet ${name} already exists` })

    const relatedFilms = await getPlanetRelatedFilms(name)

    const planet = new Planet({ ...planetData, relatedFilms })

    const savedPlanet = await planet.save()

    return httpResponse.created(savedPlanet)
  } catch (error) {
    return httpResponse.serverError({ message: error.message })
  }
}

module.exports = { handle }

const { Planet } = require('../../models/planet-model')
const httpResponse = require('../../helpers/http-response-helper')
const { isObjectId } = require('../../validations/utils')
const { getPlanetRelatedFilms, hasValidFields } = require('../../helpers/planet-helper')

const handle = async httpRequest => {
  try {
    const { pathParams: { id }, bodyParams: { name, climate, terrain } } = httpRequest

    if (!id) return httpResponse.badRequest({ message: 'Missing planet ID' })
    if (!isObjectId(id)) return httpResponse.badRequest({ message: 'Invalid ID' })

    const planetData = { name, climate, terrain }

    const { valid, missingFields } = hasValidFields(planetData)
    if (!valid) return httpResponse.badRequest({ message: `Missing fields: ${missingFields.join(', ')}` })

    const planetExistis = await Planet.find({ name })
    if (planetExistis.length) return httpResponse.conflict({ message: `Planet ${name} already exists` })

    const relatedFilms = await getPlanetRelatedFilms(name)

    const updatePlanetData = { ...planetData, relatedFilms }

    const newPlanet = await Planet.findByIdAndUpdate(id, updatePlanetData, { returnOriginal: false })

    return newPlanet
      ? httpResponse.ok(newPlanet)
      : httpResponse.notFound({ message: `No planet found with id: ${id}` })
  } catch (error) {
    return httpResponse.serverError({ message: error.message })
  }
}

module.exports = { handle }

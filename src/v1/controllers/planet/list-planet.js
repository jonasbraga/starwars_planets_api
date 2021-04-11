const { Planet } = require('../../models/planet-model')
const httpResponse = require('../../helpers/http-response-helper')
const { isObjectId } = require('../../validations/utils')

const handle = async httpRequest => {
  try {
    const { pathParams: { id }, queryParams: { name } } = httpRequest

    if (id) {
      if (!isObjectId(id)) return httpResponse.badRequest({ message: 'Invalid ID' })
      const planets = await Planet.findById(id)
      return planets
        ? httpResponse.ok(planets)
        : httpResponse.notFound({ message: `No planet found with id: ${id}` })
    }

    if (name) {
      const planets = await Planet.find({ name: new RegExp(name, 'i') })
      return planets.length
        ? httpResponse.ok(planets)
        : httpResponse.notFound({ message: `No planet found with name: ${name}` })
    }

    const planets = await Planet.find()
    return httpResponse.ok(planets)
  } catch (error) {
    return httpResponse.serverError({ message: error.message })
  }
}

module.exports = { handle }

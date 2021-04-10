const { Planet } = require('../../models/planet-model')
const httpResponse = require('../../helpers/http-response-helper')
const { isObjectId } = require('../../validations')

const handle = async httpRequest => {
  try {
    const { pathParams: { id } } = httpRequest

    if (id) {
      if (!isObjectId(id)) return httpResponse.badRequest({ message: 'Invalid ID' })
      const planets = await Planet.findById(id)
      return planets
        ? httpResponse.ok(planets)
        : httpResponse.notFound({ message: `No planet found with id: ${id}` })
    }

    const planets = await Planet.find()
    return httpResponse.ok({ planets })
  } catch (error) {
    return httpResponse.serverError({ message: error.message })
  }
}

module.exports = { handle }

const { Planet } = require('../../models/planet-model')
const httpResponse = require('../../helpers/http-response-helper')
const { isObjectId } = require('../../validations/utils')

const handle = async httpRequest => {
  try {
    const { pathParams: { id } } = httpRequest

    if (!id) return httpResponse.badRequest({ message: 'Missing planet ID' })
    if (!isObjectId(id)) return httpResponse.badRequest({ message: 'Invalid ID' })

    const planets = await Planet.findByIdAndDelete(id)

    return planets
      ? httpResponse.noContent()
      : httpResponse.notFound({ message: `No planet found with id: ${id}` })
  } catch (error) {
    return httpResponse.serverError({ message: error.message })
  }
}

module.exports = { handle }

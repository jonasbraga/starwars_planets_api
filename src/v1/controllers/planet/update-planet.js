const httpResponse = require('../../helpers/http-response-helper')

const handle = async httpRequest => {
  return httpResponse.ok({ message: 'Hello World Update!' })
}

module.exports = { handle }

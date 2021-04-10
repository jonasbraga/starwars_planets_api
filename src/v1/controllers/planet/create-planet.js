const httpResponse = require('../../helpers/http-response-helper')

const handle = async httpRequest => {
  return httpResponse.created({ message: 'Hello World Create!' })
}

module.exports = { handle }

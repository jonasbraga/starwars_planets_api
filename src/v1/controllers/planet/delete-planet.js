const httpResponse = require('../../helpers/http-response-helper')

const handle = async httpRequest => {
  return httpResponse.noContent()
}

module.exports = { handle }

const { isEmpty } = require('../validations')

const adaptRoute = (controller) => {
  return async (req, res) => {
    const httpRequest = {
      body: isEmpty(req.body) ? null : req.body,
      pathParams: isEmpty(req.params) ? null : req.params,
      queryParams: isEmpty(req.query) ? null : req.query
    }

    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

module.exports = { adaptRoute }

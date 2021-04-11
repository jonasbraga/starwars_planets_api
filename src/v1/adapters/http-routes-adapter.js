const { isEmpty } = require('../validations/utils')

const adaptRoute = (controller) => {
  return async (req, res) => {
    const httpRequest = {
      bodyParams: isEmpty(req.body) ? {} : req.body,
      pathParams: isEmpty(req.params) ? {} : req.params,
      queryParams: isEmpty(req.query) ? {} : req.query
    }

    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

module.exports = { adaptRoute }

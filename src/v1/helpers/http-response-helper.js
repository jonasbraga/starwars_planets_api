const { StatusCodes } = require('http-status-codes')

const _makeHttpResponse = (statusCode, body = {}) => ({ statusCode, body })

const ok = body => _makeHttpResponse(StatusCodes.OK, body)

const created = body => _makeHttpResponse(StatusCodes.CREATED, body)

const noContent = () => _makeHttpResponse(StatusCodes.NO_CONTENT)

const badRequest = body => _makeHttpResponse(StatusCodes.BAD_REQUEST, body)

const notFound = body => _makeHttpResponse(StatusCodes.NOT_FOUND, body)

const conflict = body => _makeHttpResponse(StatusCodes.CONFLICT, body)

const serverError = body => _makeHttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, body)

module.exports = {
  ok,
  created,
  noContent,
  badRequest,
  notFound,
  conflict,
  serverError
}

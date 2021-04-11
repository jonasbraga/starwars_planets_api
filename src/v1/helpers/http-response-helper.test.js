const {
  ok,
  created,
  noContent,
  badRequest,
  notFound,
  conflict,
  serverError
} = require('./http-response-helper')

describe('Http response helper', () => {
  test('ok(): Should return status code 200 and the body provided', () => {
    const expectedReturn = {
      statusCode: 200,
      body: {
        message: 'Success'
      }
    }
    expect(ok({ message: 'Success' })).toEqual(expectedReturn)
  })
  test('created(): Should return status code 201 and the body provided', () => {
    const expectedReturn = {
      statusCode: 201,
      body: {
        message: 'Created'
      }
    }
    expect(created({ message: 'Created' })).toEqual(expectedReturn)
  })
  test('noContent(): Should return status code 204 and an empty body', () => {
    const expectedReturn = {
      statusCode: 204,
      body: {}
    }
    expect(noContent()).toEqual(expectedReturn)
  })
  test('badRequest(): Should return status code 400 and the body provided', () => {
    const expectedReturn = {
      statusCode: 400,
      body: {
        message: 'Bad request'
      }
    }
    expect(badRequest({ message: 'Bad request' })).toEqual(expectedReturn)
  })
  test('notFound(): Should return status code 404 and the body provided', () => {
    const expectedReturn = {
      statusCode: 404,
      body: {
        message: 'Not found'
      }
    }
    expect(notFound({ message: 'Not found' })).toEqual(expectedReturn)
  })
  test('conflict(): Should return status code 409 and the body provided', () => {
    const expectedReturn = {
      statusCode: 409,
      body: {
        message: 'Conflict'
      }
    }
    expect(conflict({ message: 'Conflict' })).toEqual(expectedReturn)
  })
  test('serverError(): Should return status code 500 and the body provided', () => {
    const expectedReturn = {
      statusCode: 500,
      body: {
        message: 'Internal Server Error'
      }
    }
    expect(serverError({ message: 'Internal Server Error' })).toEqual(expectedReturn)
  })
})

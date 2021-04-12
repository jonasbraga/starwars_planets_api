require('dotenv').config()
const { dbConnection } = require('../../config/db.config')
const { handle } = require('./delete-planet')
const { Planet } = require('../../models/planet-model')

const makePlanet = async () => {
  const planet = new Planet({ name: 'Test to delete', climate: 'arid', terrain: 'desert', relatedFilms: 5 })
  return await planet.save()
}
describe('Create planet', () => {
  afterAll(async () => {
    (await dbConnection).close()
  })
  test('Should return 204 status code and delete a planet if the provided ID exists in database', async () => {
    const planet = await makePlanet()
    console.log(planet)

    const { statusCode, body } = await handle({ pathParams: { id: planet._id.toString() } })

    expect(statusCode).toBe(204)
    expect(body).toEqual({})
  })
  test('Should return 400 status code if ID was not provided', async () => {
    const { statusCode, body } = await handle({ pathParams: {} })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message', 'Missing planet ID')
  })
  test('Should return 400 status code if provided ID is not valid', async () => {
    const { statusCode, body } = await handle({ pathParams: { id: 'invalid_id' } })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message', 'Invalid ID')
  })
  test('Should return 404 status code if provided planet was not found', async () => {
    const { statusCode, body } = await handle({ pathParams: { id: '60727435f2b048e678de9681' } })

    expect(statusCode).toBe(404)
    expect(body).toHaveProperty('message', 'No planet found with id: 60727435f2b048e678de9681')
  })
  test('Should return 500 status code if an internal error occurs', async () => {
    (await dbConnection).close()

    const { statusCode, body } = await handle({ pathParams: { id: '60727435f2b048e678de9681' } })

    expect(statusCode).toBe(500)
    expect(body).toHaveProperty('message')
  })
})

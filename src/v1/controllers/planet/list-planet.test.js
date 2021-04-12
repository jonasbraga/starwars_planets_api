require('dotenv').config()
const { dbConnection } = require('../../config/db.config')
const { handle } = require('./list-planet')
const { Planet } = require('../../models/planet-model')

const makePlanet = async () => {
  const planet = new Planet({ name: 'Test to list', climate: 'arid', terrain: 'desert', relatedFilms: 5 })
  return await planet.save()
}
describe('Create planet', () => {
  beforeEach(async () => {
    await Planet.deleteMany()
  })

  afterAll(async () => {
    (await dbConnection).close()
  })

  test('Should return 200 status code and all existing planets in database', async () => {
    const planet = await makePlanet()

    const { statusCode, body } = await handle({ pathParams: {}, queryParams: {} })

    expect(statusCode).toBe(200)
    expect(Array.isArray(body)).toBe(true)
    expect(body[0]).toHaveProperty('_id', planet._id)
    expect(body[0]).toHaveProperty('name', planet.name)
    expect(body[0]).toHaveProperty('climate', planet.climate)
    expect(body[0]).toHaveProperty('terrain', planet.terrain)
    expect(body[0]).toHaveProperty('relatedFilms', planet.relatedFilms)
    expect(body[0]).toHaveProperty('createdAt', planet.createdAt)
    expect(body[0]).toHaveProperty('updatedAt', planet.updatedAt)
  })
  test('Should return 200 status code and an empty array if there is no planets in database', async () => {
    const { statusCode, body } = await handle({ pathParams: {}, queryParams: {} })

    expect(statusCode).toBe(200)
    expect(Array.isArray(body)).toBe(true)
    expect(body.length).toBe(0)
  })
  test('Should return 200 status code and the planet by given ID', async () => {
    const planet = await makePlanet()

    const { statusCode, body } = await handle({ pathParams: { id: planet._id.toString() }, queryParams: {} })

    expect(statusCode).toBe(200)
    expect(body instanceof Object).toBe(true)
    expect(body).toHaveProperty('_id', planet._id)
    expect(body).toHaveProperty('name', planet.name)
    expect(body).toHaveProperty('climate', planet.climate)
    expect(body).toHaveProperty('terrain', planet.terrain)
    expect(body).toHaveProperty('relatedFilms', planet.relatedFilms)
    expect(body).toHaveProperty('createdAt', planet.createdAt)
    expect(body).toHaveProperty('updatedAt', planet.updatedAt)
  })
  test('Should return 400 status code if the given ID is invalid', async () => {
    const { statusCode, body } = await handle({ pathParams: { id: 'invalid_id' }, queryParams: {} })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message', 'Invalid ID')
  })
  test('Should return 404 status code if the given ID is not found in database', async () => {
    const { statusCode, body } = await handle({ pathParams: { id: '60727435f2b048e678de9681' }, queryParams: {} })

    expect(statusCode).toBe(404)
    expect(body).toHaveProperty('message', 'No planet found with id: 60727435f2b048e678de9681')
  })
  test('Should return 200 status code and the planet(s) by the name', async () => {
    const planet = await makePlanet()

    const { statusCode, body } = await handle({ pathParams: {}, queryParams: { name: planet.name } })

    expect(statusCode).toBe(200)
    expect(Array.isArray(body)).toBe(true)
    expect(body[0]).toHaveProperty('_id', planet._id)
    expect(body[0]).toHaveProperty('name', planet.name)
    expect(body[0]).toHaveProperty('climate', planet.climate)
    expect(body[0]).toHaveProperty('terrain', planet.terrain)
    expect(body[0]).toHaveProperty('relatedFilms', planet.relatedFilms)
    expect(body[0]).toHaveProperty('createdAt', planet.createdAt)
    expect(body[0]).toHaveProperty('updatedAt', planet.updatedAt)
  })
  test('Should return 404 status code if the given name was not found in database', async () => {
    const { statusCode, body } = await handle({ pathParams: {}, queryParams: { name: 'invalid name' } })

    expect(statusCode).toBe(404)
    expect(body).toHaveProperty('message', 'No planet found with name: invalid name')
  })
  test('Should return 500 status code if an internal error occurs', async () => {
    (await dbConnection).close()

    const { statusCode, body } = await handle({ pathParams: {}, queryParams: {} })

    expect(statusCode).toBe(500)
    expect(body).toHaveProperty('message')
  })
})

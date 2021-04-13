require('dotenv').config()
const nock = require('nock')
const { dbConnection } = require('../../config/db.config')
const { handle } = require('./update-planet')
const { tatooinePlanetResponse } = require('../../helpers/mocks/swapi.mock')
const { Planet } = require('../../models/planet-model')

const makePlanet = async ({ name = 'Test to update', climate = 'arid', terrain = 'desert', relatedFilms = 5 }) => {
  const planet = new Planet({ name, climate, terrain, relatedFilms })
  return await planet.save()
}
const updatePlanet = async (id, planet) => {
  return await handle({
    pathParams: { id },
    bodyParams: planet
  })
}

describe('Create planet', () => {
  beforeAll(async () => {
    await Planet.deleteMany()
  })

  beforeEach(async () => {
    nock('https://swapi.dev')
      .get('/api/planets/?search=Tatooine')
      .reply(200, tatooinePlanetResponse)
  })

  afterAll(async () => {
    (await dbConnection).close()
  })
  test('Should return 200 status code and the updated planet if all data is provided', async () => {
    const originalPlanet = await makePlanet({})
    const { statusCode, body } = await updatePlanet(originalPlanet._id.toString(), { name: 'Tatooine', climate: 'perfect', terrain: 'water' })

    expect(statusCode).toBe(200)
    expect(body).toHaveProperty('_id')
    expect(body).toHaveProperty('name', 'Tatooine')
    expect(body).toHaveProperty('climate', 'perfect')
    expect(body).toHaveProperty('terrain', 'water')
    expect(body).toHaveProperty('relatedFilms', 5)
  })
  test('Should return 400 status code if ID was not provided', async () => {
    const { statusCode, body } = await updatePlanet('', { name: 'Tatooine', climate: 'perfect', terrain: 'water' })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message', 'Missing planet ID')
  })
  test('Should return 400 status code if provided ID is not valid', async () => {
    const { statusCode, body } = await updatePlanet('invalid_id', { name: 'Tatooine', climate: 'perfect', terrain: 'water' })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message', 'Invalid ID')
  })
  test('Should return 400 status code and the missing fields', async () => {
    const { statusCode, body } = await updatePlanet('607529cb31f6d300146683b5', {})

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message', 'Missing fields: name, climate, terrain')
  })
  test('Should return 409 status code if given planet already exists', async () => {
    const originalPlanet = await makePlanet({ name: 'Tatooine', climate: 'perfect', terrain: 'water' })
    const { statusCode, body } = await updatePlanet(originalPlanet._id.toString(), { name: 'Tatooine', climate: 'perfect', terrain: 'water' })

    expect(statusCode).toBe(409)
    expect(body).toHaveProperty('message', 'Planet Tatooine already exists')
  })
  test('Should return 404 status code if provided planet ID was not found', async () => {
    await Planet.deleteMany()
    const { statusCode, body } = await updatePlanet('60727435f2b048e678de9681', { name: 'Tatooine', climate: 'perfect', terrain: 'water' })

    expect(statusCode).toBe(404)
    expect(body).toHaveProperty('message', 'No planet found with id: 60727435f2b048e678de9681')
  })
  test('Should return 500 status code if an internal error occurs', async () => {
    (await dbConnection).close()

    const { statusCode, body } = await updatePlanet('60727435f2b048e678de9681', { name: 'Tatooine', climate: 'perfect', terrain: 'water' })

    expect(statusCode).toBe(500)
    expect(body).toHaveProperty('message')
  })
})

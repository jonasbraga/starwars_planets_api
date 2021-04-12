require('dotenv').config()
const nock = require('nock')
const { dbConnection } = require('../../config/db.config')
const { handle } = require('./create-planet')
const { tatooinePlanetResponse } = require('../../helpers/mocks/swapi.mock')
const { Planet } = require('../../models/planet-model')

const makePlanet = async (planet) => {
  return await handle({
    bodyParams: planet
  })
}
describe('Create planet', () => {
  beforeEach(async () => {
    nock('https://swapi.dev')
      .get('/api/planets/?search=Tatooine')
      .reply(200, tatooinePlanetResponse)
    await Planet.deleteMany()
  })

  afterAll(async () => {
    (await dbConnection).close()
  })
  test('Should return 201 status code and create a planet if all data is provided', async () => {
    const { statusCode, body } = await makePlanet({ name: 'Tatooine', climate: 'arid', terrain: 'desert' })

    expect(statusCode).toBe(201)
    expect(body).toHaveProperty('_id')
    expect(body).toHaveProperty('name', 'Tatooine')
    expect(body).toHaveProperty('climate', 'arid')
    expect(body).toHaveProperty('terrain', 'desert')
    expect(body).toHaveProperty('relatedFilms', 5)
  })
  test('Should return 400 status code and the missing fields', async () => {
    const { statusCode, body } = await makePlanet({})

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message', 'Missing fields: name, climate, terrain')
  })
  test('Should return 409 status code if given planet already exists', async () => {
    await makePlanet({ name: 'Tatooine', climate: 'arid', terrain: 'desert' })
    const { statusCode, body } = await makePlanet({ name: 'Tatooine', climate: 'arid', terrain: 'desert' })

    expect(statusCode).toBe(409)
    expect(body).toHaveProperty('message', 'Planet Tatooine already exists')
  })
  test('Should return 500 status code if an internal error occurs', async () => {
    (await dbConnection).close()

    const { statusCode, body } = await makePlanet({ name: 'Tatooine', climate: 'arid', terrain: 'desert' })

    expect(statusCode).toBe(500)
    expect(body).toHaveProperty('message')
  })
})

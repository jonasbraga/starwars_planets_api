const nock = require('nock')
const { getPlanetRelatedFilms, hasValidFields } = require('./create-planet-helper')
const { tatooinePlanetResponse, unknowPlanetResponse } = require('./mocks/swapi.mock')

describe('Create planet helper', () => {
  test('getPlanetRelatedFilms(): Should return the number of related filmes by the given planet name', async () => {
    nock('https://swapi.dev')
      .get('/api/planets/?search=Tatooine')
      .reply(200, tatooinePlanetResponse)
    const relatedFilms = await getPlanetRelatedFilms('Tatooine')
    expect(relatedFilms).toBe(5)
  })
  test('getPlanetRelatedFilms(): Should return the 0 if the planet was not found', async () => {
    nock('https://swapi.dev')
      .get('/api/planets/?search=UnknowPlanet')
      .reply(200, unknowPlanetResponse)
    const relatedFilms = await getPlanetRelatedFilms('UnknowPlanet')
    expect(relatedFilms).toBe(0)
  })
  test('hasValidFields(): Should return true if all fields were provided', () => {
    const { valid, missingFields } = hasValidFields({ name: 'Earth', climate: 'warm', terrain: 'grass' })
    expect(valid).toBe(true)
    expect(missingFields).toStrictEqual([])
  })
  test('hasValidFields(): Should return false and the missing fields when any required field was not provided', () => {
    const { valid, missingFields } = hasValidFields({ terrain: 'grass' })
    expect(valid).toBe(false)
    expect(missingFields).toStrictEqual(['name', 'climate'])
  })
})

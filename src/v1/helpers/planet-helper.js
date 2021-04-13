const { default: axios } = require('axios')
const { getMissingFields } = require('../validations/utils')

const getPlanetRelatedFilms = async planetName => {
  const swApiEndpoint = `https://swapi.dev/api/planets/?search=${planetName}`
  const { data: planetsResponse } = await axios.get(swApiEndpoint)

  const relatedFilmsNumber = planetsResponse.results.length ? planetsResponse.results.shift().films.length : 0

  return relatedFilmsNumber
}

const hasValidFields = ({ name, climate, terrain }) => {
  const requiredParams = ['name', 'climate', 'terrain']
  const missingParams = getMissingFields({ name, climate, terrain }, requiredParams)

  return {
    valid: !missingParams.length,
    missingFields: missingParams
  }
}

module.exports = {
  getPlanetRelatedFilms,
  hasValidFields
}

const isEmpty = object => !Object.entries(object || {}).length

const isObjectId = id => !!id.match(/^[0-9a-fA-F]{24}$/)

const getMissingFields = function (requestParams, requiredParams) {
  const missingFields = []
  for (const p in requiredParams) {
    if (!requestParams[requiredParams[p]]) missingFields.push(requiredParams[p])
  }

  return missingFields
}
module.exports = {
  isEmpty,
  isObjectId,
  getMissingFields
}

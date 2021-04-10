const isEmpty = object => !Object.entries(object || {}).length
const isObjectId = id => !!id.match(/^[0-9a-fA-F]{24}$/)

module.exports = {
  isEmpty,
  isObjectId
}

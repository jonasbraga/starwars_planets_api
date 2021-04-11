const { isEmpty, isObjectId, getMissingFields } = require('./utils')

describe('Utils functions', () => {
  test('isEmpty(): Should return true if a value is empty or falsy', () => {
    expect(isEmpty({})).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(true)).toBe(true)
    expect(isEmpty(false)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
  })
  test('isEmpty(): Should return false if a value is not empty', () => {
    expect(isEmpty({ data: 'data' })).toBe(false)
    expect(isEmpty('data')).toBe(false)
  })
  test('isObjectId(): Should return true if the string matches ObjectID pattern', () => {
    expect(isObjectId('60727435f2b048e678de9681')).toBe(true)
  })
  test('isObjectId(): Should return false if the string does not matches ObjectID pattern', () => {
    expect(isObjectId('1')).toBe(false)
    expect(isObjectId('60727435f2b048e678de9681A')).toBe(false)
    expect(isObjectId('60727435f2b048z678de9681')).toBe(false)
  })
  test('getMissingFields(): Should return an array with the fields that was\'nt provided', () => {
    expect(getMissingFields({}, ['name', 'climate', 'terrain'])).toStrictEqual(['name', 'climate', 'terrain'])
  })
  test('getMissingFields(): Should return an empty array if all fields are present', () => {
    expect(getMissingFields({ name: 'Earth', climate: 'warm', terrain: 'grass' })).toStrictEqual([])
  })
})

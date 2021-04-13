const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const { DB_HOST, DB_PORT, DB_NAME } = process.env

const dbConnection = mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected with the force successfully!')
  return mongoose.connection
}, err => {
  console.log(`Database connect error: ${err}`)
  process.exit(1)
})

module.exports = { dbConnection }

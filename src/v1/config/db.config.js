const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const dbConnection = mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected with the force successfully!')
  return mongoose.connection
}, err => {
  console.log(`Database connect error: ${err}`)
  process.exit()
})

module.exports = { dbConnection }

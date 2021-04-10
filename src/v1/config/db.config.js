const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected with the force successfully!')
}, err => {
  console.log(`Database connect error: ${err}`)
  process.exit()
})

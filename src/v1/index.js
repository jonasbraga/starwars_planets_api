require('dotenv').config()

const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const planets = require('./routes/planets-routes')

app.use('/planets', planets)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

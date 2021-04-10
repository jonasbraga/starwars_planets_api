require('dotenv').config()

const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const { planetsRoutes } = require('./routes/planets-routes')

app.use('/planets', planetsRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

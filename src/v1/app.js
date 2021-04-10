require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongooseConnection = require('./config/db.config')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.set('mongoose connection', mongooseConnection)

const { planetsRoutes } = require('./routes/planets-routes')

app.use('/v1/planets', planetsRoutes)

module.exports = { app }

const mongoose = require('mongoose')

const PlanetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    climate: { type: String, required: true },
    terrain: { type: String, required: true },
    related_films: { type: Number, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now }
  },
  { collection: 'planets' }
)

const Planet = mongoose.model('Planet', PlanetSchema)
module.exports = { Planet }

const mongoose = require('mongoose')

const PlanetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    climate: { type: String, required: true },
    terrain: { type: String, required: true },
    relatedFilms: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
  },
  { collection: 'planets' }
)

const Planet = mongoose.model('Planet', PlanetSchema)
module.exports = { Planet }

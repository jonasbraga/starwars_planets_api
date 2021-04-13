const mongoose = require('mongoose')

const PlanetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    climate: { type: String, required: true },
    terrain: { type: String, required: true },
    relatedFilms: { type: Number, required: true }
  },
  {
    collection: 'planets',
    timestamps: true
  }
)

const Planet = mongoose.model('Planet', PlanetSchema)
module.exports = { Planet }

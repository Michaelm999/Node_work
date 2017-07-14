const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
  	name: String,
  	albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }]
  })

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist

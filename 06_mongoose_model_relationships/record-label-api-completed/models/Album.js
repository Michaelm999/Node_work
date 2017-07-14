const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
	title: String,
	rating: Number
})

const albumSchema = new mongoose.Schema({
  _by : {type: mongoose.Schema.Types.ObjectId, ref: 'Artist'},
	title: {type: String, unique: true, required: true},
  year: Number,
	songs: [songSchema]
})

const Album = mongoose.model('Album', albumSchema)

module.exports = Album

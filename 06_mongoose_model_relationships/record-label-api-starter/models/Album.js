const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
	title: {type: String, required: true, default: "Untitled"},
	rating: {type: Number, default: 3}
})

const albumSchema = new mongoose.Schema({
  title: {type: String, required: true, default: "Untitled"},
  year: {type: Number, required: true},
  songs: [songSchema]
})

const Album = mongoose.model('Album', albumSchema)
module.exports = Album

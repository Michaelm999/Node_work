const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  port = 3000
  Album = require('./models/Album.js')

mongoose.connect('mongodb://localhost/record-label', (err) => {
  console.log(err || "Connected to MongoDB.")
})

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({message: "Record Label API root."})
})

// THE COMPLETE API:

// 1. ALBUM ROUTES
///////////////////////////////////////////////

// get all albums
app.get('/albums', (req, res) => {
	Album.find({}, (err, albums) => {
		if(err) return console.log(err)
		res.json(albums)
	})
})

// post a new album
app.post('/albums', (req, res) => {
  Album.create(req.body, (err, album) => {
    if(err) return console.log(err)
    res.json(album)
  })
})
// get a specific album
app.get('/albums/:id', (req, res) => {
  Album.findById(req.params.id, (err, album) => {
    if(err) return console.log(err)
    res.json(album)
  })
})
// delete an album
app.delete('/albums/:id', (req, res) => {
  Album.findByIdAndRemove(req.params.id, (err, album) => {
  if(err) return console.log(err)
  res.json({message: "Album gone."})
  })
})

// 2. SONG ROUTES:
///////////////////////////////////////////////

// get all songs in an album
app.get('/albums/:id/songs', (req, res) => {
  Album.findById(req.params.id, (err, album) => {
    if(err) return console.log(err)
    res.json(album.songs)
  })
})
// post a new song to a specific album
app.post('/albums/:id/songs', (req, res) => {
 Album.findById(req.params.id, (err, album) => {
   if(err) return console.log(err)
   album.songs.push(req.body)
   album.save((err) => {
     if(err) return console.log(err)
     res.json(album)
   })
 })
})

// get a specific song from a specific album
app.get('/albums/:id/songs/:songId', (req, res) => {
	Album.findById(req.params.id, (err, album) => {
		if(err) return console.log(err)
    const song = album.songs.id(req.params.songId)
		res.json(song)
	})
})
// delete a song from an album
app.delete('/albums/:id/songs/:songId', (req, res) => {
  Album.findById(req.params.id, (err, album) => {
    album.songs.id(req.params.songId).remove()
    album.save((err) => {
      res.json(album)
    })
  })
})

// ARTIST ROUTES
///////////////////////////////////////////////

// index all artists

// create an artist

// get a specific artist

// create an album belonging to a specific artist

// delete an artist and all of their albums

app.listen(port, (err) => {
  console.log(err || `Server running on ${port}`)
})

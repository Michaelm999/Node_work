const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  port = 3000
  Album = require('./models/Album.js')
  Artist = require('./models/Artist.js')

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

//edit albums
app.patch('/albums/:id', function(req, res) {
  Album.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedAlbum) {
    if(err) return console.log(err)
    res.json({message: "Album updated!", album: updatedAlbum})
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

//change a song
app.patch('/albums/:id/songs/:songId', (req, res) => {
  Album.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, album) {
    if(err) return console.log(err)
    res.json({message: "Album updated!"})
  })
})

// delete a song from an album
app.delete('/albums/:id/songs/:songId', (req, res) => {
  Album.findById(req.params.id, (err, album) => {
    var song = album.songs.id(req.params.songId)
    if(song !== null) {
      song.remove()
    album.save((err) => {
      if (err) return console.log(err)
      res.json(album)
    })
  }
  else res.json(album)
  })
})

// ARTIST ROUTES
///////////////////////////////////////////////

// index all artists
app.get('/artists', (req, res) => {
	Artist.find({}, (err, artists) => {
		if(err) return console.log(err)
		res.json(artists)
	})
})
// create an artist
app.post('/artists', (req, res) => {
  Artist.create(req.body, (err, artist) => {
    if(err) return console.log(err)
    res.json(artist)
  })
})
// get a specific artist
app.get('/artists/:id', (req, res) => {
  // .populate('albums') will return the artist with an albums array fully populated with the albums instead of just their id's:
	Artist.findById(req.params.id).populate('albums').exec((err, artist) => {
		if(err) return console.log(err)
		res.json(artist)
	})
})

// create an album belonging to a specific artist
app.post('/artists/:id/albums', (req, res) => {

  // first, find the artist
  Artist.findById(req.params.id, (err, artist) => {
    if(err) return console.log(err)

    // create a new album, and set the _by property to this artist's id:
    var newAlbum = new Album(req.body)
    newAlbum._by = artist._id

    // save the album:
    newAlbum.save((err) => {
      if(err) return console.log(err)

      // add this album to the array of this artist's albums:
      artist.albums.push(newAlbum)
      artist.save((err, album) => {
        if(err) return console.log(err)
        // send the album down as JSON
        res.json(album)
      })
    })
  })
})

// delete an artist and all of their albums
app.delete('/artists/:id', (req, res) => {
  // first remove the artist:
  Artist.findByIdAndRemove(req.params.id, (err, artist) => {
    if(err) return console.log(err)
    Album.remove({_by: req.params.id}, (err, albums) => {
      // then remove all albums that belong to the artist
      if(err) return console.log(err)
      res.json({message: "Artist deleted."})
    })
  })
})

app.listen(port, (err) => {
  console.log(err || `Server running on ${port}`)
})

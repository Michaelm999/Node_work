const
  dotenv = require('dotenv').load(),
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  port = 3000
  request = require('request')

app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.render('search')
})

app.get('/search/:searchTerm', function(req, res) {
  var searchTerm = req.params.searchTerm
  var apiUrl = 'https://api.giphy.com/v1/gifs/search'
  var apiKey = process.env.GIPHY_API_KEY
  var requestUrl = `${apiUrl}?api_key=${apiKey}&q=${searchTerm}`

  request.get(requestUrl, function(err, response, body) {
    console.log(body)
  })
})


app.listen(port, function(err) {
  console.log(err || `Server running on ${port}.`)
})

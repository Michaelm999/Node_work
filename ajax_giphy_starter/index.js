const
  dotenv = require('dotenv').load(),
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  port = 3000
  imageController = require('./controllers/images.js')

app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))


app.get('/', imageController.index)
app.get('/search/:searchTerm', imageController.search)
app.get('/banana', imageController.banana)


app.listen(port, (err) => {
  console.log(err || `Server running on ${port}.`)
})

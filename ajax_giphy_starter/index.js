const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  port = 3000

app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.render('search')
})

app.listen(port, function(err) {
  console.log(err || `Server running on ${port}.`)
})

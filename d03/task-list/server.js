const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000
const mongoURL = 'mongodb://localhost/task-list'

app.get('/', function(req, res) {
  res.sendFile('index.html', {root: __dirname})
})


app.listen(PORT, function(){'listening on port', PORT})

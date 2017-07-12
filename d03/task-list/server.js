const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')


const app = express()
const PORT = 3000
const mongoURL = 'mongodb://localhost/todo_spa'

mongoose.connect(mongoURL, function(err) {
  if (err) console.log(err)
  console.log('Connected to mongo database:', mongoURL);
})

const TaskSchema = new mongoose.Schema({
  body: String, completed: Boolean
})
const Task = mongoose.model('Task', TaskSchema)

app.post('/tasks', function(req, res){
Task.create({body: 'play ball', completed: false})
if (err) console.log(err)
  res.sen(task)
})
app.get('/', function(req, res) {
  res.sendFile('index.html', {root: __dirname})
})

app.get('/tasks', function(req, res){
  Task.find({}, function(err, tasks){
    if (err) console.log(err)
      res.send(tasks)
  })
})



app.listen(PORT, function(){'listening on port', PORT})

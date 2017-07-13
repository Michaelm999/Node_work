const mongoose = require('mongoose'),
  express = require('express'),
  bodyParser = require('body-parser')

const app = express(),
  PORT = 3000,
  mongoURL = 'mongodb://localhost/todo_spa'

mongoose.connect(mongoURL, function(err){
  if (err) console.log(err)
  console.log('Connected to mongo database:', mongoURL)
})

const TaskSchema = new mongoose.Schema({
  body: String, completed: Boolean
})

const Task = mongoose.model('Task', TaskSchema)

// Task.create({body: 'play ball', completed: false})

app.use(bodyParser.json())

//slow the server down
app.use(function(req, res, next){
  setTimeout(function() {
    next()
  }, 2000)
})

app.get('/', function(req, res){
  res.sendFile('index.html', {root: __dirname})
})

app.get('/tasks', function (req, res){
  Task.find({}, function(err, tasks){
    if (err) console.log(err)
    res.send(tasks)
  })
})

app.post('/tasks', function(req, res) {
  console.log(req.body)
  Task.create(req.body, function(err, savedTask) {
    if(err) return console.log(err)
    res.json({message: "Task created!", task: savedTask})
  })
})

app.delete('/tasks/:id', function(req, res) {
  Task.findByIdAndRemove(req.params.id, function(err, finishedTask) {
    if(err) return console.log(err)
    res.json({message: "Task Done", task: finishedTask})
  })
})

app.listen(PORT, function(){
  console.log('listening on port:', PORT)
})

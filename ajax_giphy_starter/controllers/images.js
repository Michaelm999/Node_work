const request = require('request')

module.exports = {

    index: (req, res) => {
      res.render('search')
    },

    search: (req, res) => {
    var searchTerm = req.params.searchTerm
    var apiUrl = 'https://api.giphy.com/v1/gifs/search'
    var apiKey = process.env.GIHPY_API_KEY
    var requestUrl = `${apiUrl}?api_key=${apiKey}&q=${searchTerm}`

    request.get(requestUrl, (err, response, body) => {
      res.json(JSON.parse(body))
    })
  },

  banana: (req, res) => {
    res.send("<h1>Bannana!</h1>")
  }
}

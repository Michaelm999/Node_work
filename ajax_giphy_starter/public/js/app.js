console.log("app.js is loaded in the client...")
var searchInput = $('#search-input')
var searchButton = $('#search-button')


searchButton.on('click', () => {
  console.log('click');
  var requestSettings = {
    method: 'get',
    url: '/search/' + searchInput.val()
  }
  function cb(d){
    //example showing first image
    for (var i = 0; i < d.data.length; i++) {
    var imgURL = d.data[i].images.downsized.url
    var images = $('.images')
    images.append('<img src=' + imgURL + '>')
    }
  }
  $.ajax(requestSettings).done(cb)
})

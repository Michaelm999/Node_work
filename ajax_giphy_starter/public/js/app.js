console.log("app.js is loaded in the client...")
var searchInput = $('#search-input')
var searchButton = $('#search-button')


searchButton.on('click', function() {
  console.log('click');
  var requestSettings = {
    method: 'get',
    url: '/search/' + searchInput.val()
  }
  function cb(d){
    console.log(d);
  }
  $.ajax(requestSettings).done(cb)
})

var candies = [
{id: 1, name: "Chewing Gum" , color: "Red"},
{id: 2, name: "Pez"         , color: "Green"},
{id: 3, name: "Marshmallow" , color: "Pink"},
{id: 4, name: "Candy Stick" , color: "Blue"}
]

function index(req, res) {
  res.render('candies/index', {candies: candies})
}

function create(req, res) {
  candies.push(req.body)
  res.json(candies);
};

function show(req, res) {
  candy = candies.find(function(c) {
    return c["id"] == req.params.id;
  });
  res.json(candy);
}

function update(req, res) {
  candyIndex = candies.findIndex(function(c) {
    return c["id"] == req.params.id;
  });
  candies[candyIndex] = req.body;
  res.json(candies);
}

function destroy(req, res) {
  candyIndex = candies.findIndex(function(c) {
    return c["id"] == req.params.id;
  });
  candies.splice(candyIndex,1);
  res.json(candies);
}

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy
}

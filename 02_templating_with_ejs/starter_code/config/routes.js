var express = require('express');
var router = express.Router();

var candiesCtrl = require('../controllers/candies');

router.get('/', function(req, res) {
  res.send('<h1>This works</h1>')
});

router.get('/candies', candiesCtrl.index);
router.post('/candies', candiesCtrl.create);
router.get('/candies/:id/delete', candiesCtrl.destroy);
router.get('/candies/:id', candiesCtrl.show);
router.put('/candies/:id', candiesCtrl.update);

module.exports = router;

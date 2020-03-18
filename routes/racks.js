var express = require('express');
var router = express.Router();
const racks = require('../controllers/racks.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('racks', { title: 'NetRacks'});
});

router.post('/', racks.create);

router.get('/all', racks.findAll);

router.get('/racklist', racks.rackAndItems);

router.get('/:id', racks.findOne);

router.put('/:id', racks.update);

router.delete('/:id', racks.delete);

router.delete('/', racks.deleteAll);


module.exports = router;
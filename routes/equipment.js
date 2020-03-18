var express = require('express');
var router = express.Router();
const Equipments = require('../controllers/equipment.controller');


router.post('/', Equipments.create);

router.get('/all', Equipments.findAll);

router.get('/:id', Equipments.findOne);

router.put('/:id', Equipments.update);

router.delete('/:id', Equipments.delete);

router.delete('/', Equipments.deleteAll);


module.exports = router;
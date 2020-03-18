const db = require('../models');
const Equipment = db.Equipment;
const Op = db.Sequelize.Op;

// Create and Save a new Equipments
exports.create = (req, res) => {
  if (!req.body.name) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
      return;
  }
  const equipment = {
      name: req.body.name,
      label: req.body.label,
      rackId: req.body.rackId
  };

  Equipment.create(equipment)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while create the Equipment."
        });
    });
};

// Retrieve all Equipments from the database.
exports.findAll = (req, res) => {
  
  Equipment.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Equipments"
        });
    });
};

// Find a single Equipment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Equipment.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Equipment with id=" + id
      });
    });
};

// Update a Equipment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Equipment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Equipment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Equipment with id=${id}. Maybe Equipment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Equipment with id=" + id
      });
    });
};

// Delete a Equipment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Equipment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Equipment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Equipment with id=${id}. Maybe Equipment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Equipment with id=" + id
      });
    });
};

// Delete all Equipments from the database.
exports.deleteAll = (req, res) => {
  Equipment.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Equipments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Equipments."
      });
    });
};
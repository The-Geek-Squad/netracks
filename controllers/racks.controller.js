const db = require('../models');
const Equipment = db.Equipment;
const Rack = db.Rack;
const Op = db.Sequelize.Op;

// Create and Save a new Racks
exports.create = (req, res) => {
  if (!req.body.name) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
      return;
  }
  const rack = {
      name: req.body.name
  };

  Rack.create(rack)
    .then(data => {
        res.redirect('/');
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while create the rack."
        });
    });
};

// Retrieve all Racks from the database.
exports.findAll = (req, res) => {
  
  Rack.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving racks"
        });
    });
};

// Find a single Rack with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Rack.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Rack with id=" + id
      });
    });
};

// Update a Rack by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Rack.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Rack was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Rack with id=${id}. Maybe Rack was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Rack with id=" + id
      });
    });
};

// Delete a Rack with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Rack.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Rack was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Rack with id=${id}. Maybe Rack was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Rack with id=" + id
      });
    });
};

// Delete all Racks from the database.
exports.deleteAll = (req, res) => {
  Rack.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Racks were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Racks."
      });
    });
};

exports.rackAndItems = (req, res) => {

    Rack.findAll({
        include: [{
            model: Equipment
        }]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while accessing the database."
        });
    });
}
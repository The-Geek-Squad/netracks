const dbConfig = require('../config/db.config');

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Rack = sequelize.define("rack", {
    name: {
        type: Sequelize.STRING
    }
});

db.Equipment = sequelize.define("equipment", {
    name: {
        type: Sequelize.STRING
    },
    label: {
        type: Sequelize.STRING
    },
    racklocation: {
        type: Sequelize.INTEGER,
    }
});

db.Rack.hasMany(db.Equipment);
db.Equipment.belongsTo(db.Rack);

module.exports = db;
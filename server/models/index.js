'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require('../config/config.json')[env];
var db        = {};


// Set Sequelize for Dev or Production
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(config.use_env_variable, { 
    dialect: "postgres",
    protocol: "postgres",
    logging:  true
  });
} else {
  
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  );
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// Map Classes and Associations to DB
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
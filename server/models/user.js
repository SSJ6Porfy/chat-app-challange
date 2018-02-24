'use strict';
let bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordDigest: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Message, {
      foreignKey: "userId",
      as: "messages"
    });
  };
  return User;
};
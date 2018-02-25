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
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.passwordDigest = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.passwordDigest);
      }
    }
  });
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Message, {
      foreignKey: "userId",
      as: "messages"
    });
  };
  return User;
};
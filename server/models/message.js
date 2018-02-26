'use strict';
var Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const sequelize = require('./index');

const Message = sequelize.define('Message', {
  senderId: { 
    type: Sequelize.INTEGER,
    allowNull: false
  },
  recipientId: { 
    type: Sequelize.INTEGER,
    allowNull: false
  },
  body: { 
    type: Sequelize.STRING,
    allowNull: false
  }
}, {});

Message.associate = (models) => {
  // associations can be defined here
  Message.belongsTo(models.User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "author"
  });
};

// sequelize.sync();

module.exports = Message;
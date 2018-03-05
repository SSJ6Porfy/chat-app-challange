'use strict';

module.exports = (sequelize, DataTypes) => {
var Message = sequelize.define("Message", {
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recipientId: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  body: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  chatroomId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {});

Message.associate = (models) => {
  // associations can be defined here
  Message.belongsTo(models.User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  Message.belongsTo(models.Chatroom, {
    foreignKey: "chatroomId",
    onDelete: "CASCADE",
  });
};

  return Message;

};
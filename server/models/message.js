'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sent: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    body: { 
      type: DataTypes.STRING,
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
  return Message;
};
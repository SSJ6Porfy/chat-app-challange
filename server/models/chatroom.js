'use strict';
module.exports = (sequelize, DataTypes) => {
  var Chatroom = sequelize.define('Chatroom', {
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    participantOneId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    participantTwoId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Chatroom.associate = function(models) {
    // associations can be defined here
    Chatroom.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: "CASCADE"
		});

		Chatroom.hasMany(models.Message, {
			foreignKey: 'chatroomId',
			as: 'messages',
		});
  };
  return Chatroom;
};


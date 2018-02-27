'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define("User", {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	passwordDigest: {
		type: DataTypes.STRING,
		validate: {
			notEmpty: true
		}
	},
	sessionToken: {
		type: DataTypes.STRING,
		validate: {
			notEmpty: true
		}
	},
}, {
	indexes: [{unique: true, fields: ['username']}],
	hooks: {
		beforeCreate: (user) => {
			if (user.passwordDigest) {
				const salt = bcrypt.genSaltSync();
				user.passwordDigest = bcrypt.hashSync(user.passwordDigest, 10,salt);
			}
		}
	},
});
	User.prototype.authenticate = function(value) {
		if (bcrypt.compareSync(value, this.passwordDigest)) {
			return this;
		} else {
			return false;
		}
	};

	User.associate = (models) => {
		User.hasMany(models.Message, {
			foreignKey: 'userId',
			as: 'messages',
		});
	};
	return User;
};
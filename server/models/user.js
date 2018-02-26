'use strict';
var bcrypt = require('bcrypt');
var Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const sequelize = require('./index');

var User = sequelize.define('User', {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	passwordDigest: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		}
	},
	sessionToken: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		}
	},
}, {
	freezeTableName: true,
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

User.associate = (models) => {
	User.hasMany(models.Message, {
		foreignKey: 'userId',
		as: 'messages',
	});
};

User.prototype.authenticate = function(value) {
	if (bcrypt.compareSync(value, this.passwordDigest)) {
		return this;
	} else {
		return false;
	}
};


module.exports = User;
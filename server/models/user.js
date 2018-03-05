'use strict';
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

	User.prototype.generateToken = function() {
		const user = this;
			// 1 week expiration
  		const token = jwt.sign(
			{ _id: user._id }, 
			process.env.JWT_TOKEN || 'myreallybigsecret', 
			{ expiresIn: 604800 });
			
			const sessionToken = `JWT ${token}`;
			user.sessionToken = sessionToken;
			user.save();
			return sessionToken;
	};
	
	User.findByCredentials = function(username, password) {

		return User.findOne({ where: { username: username } }).then(user => {
		  if (!user) {
				return Promise.reject();
		  }
	  
		  return new Promise((resolve, reject) => {
									bcrypt.compare(password, user.passwordDigest, (err, res) => {
										if (res) {
											resolve(user);
										} else {
											reject();
										}
									});
								 });
		});
	};

	User.associate = (models) => {
		User.hasMany(models.Message, {
			foreignKey: 'userId',
			as: 'messages',
		});

		User.hasMany(models.Chatroom, {
			foreignKey: 'userId',
			as: 'chatroom',
		});

	};
	return User;
};
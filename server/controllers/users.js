const User = require("../models/user");

module.exports = {
    create(req, res) {
        return User
            .create({ 
                username: req.body.username,
                passwordDigest: req.body.password
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    show(req, res) {
        return User
            .findbyId(req.body.id)
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
};
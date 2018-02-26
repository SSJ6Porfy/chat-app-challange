const User = require("../models/user");

module.exports = {
    create(req, res) {
        console.log(req.body);
        return User
            .create({ 
                username: req.body.username,
                passwordDigest: req.body.password
            })
            .then(user => res.status(200).send(user))
            .catch(error => { 
                console.log(error);
                res.status(400).send(error);
            });
    },
    show(req, res) {
        return User
            .findById(req.params.userId)
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
};
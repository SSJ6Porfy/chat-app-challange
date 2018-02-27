const User = require("../models/index").db.User;

module.exports = {
    create(req, res) {
        console.log(req.body);
        return User
            .create({ 
                username: req.body.username,
                passwordDigest: req.body.password
            })
            .then(user => res.json(user))
            .catch(error => { 
                console.log(error);
                res.status(400).send(error);
            });
    },
    show(req, res) {
        return User
            .findById(req.params.userId)
            .then(user => res.json(user))
            .catch(error => res.status(400).send(error));
    },
};
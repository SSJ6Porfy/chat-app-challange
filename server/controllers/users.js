const User = require("../models").User;

module.exports = {
    create(req, res) {
        return User
            .create({ 
                username: req.body.user.username,
                passwordDigest: req.body.user.password
            })
            .then(user => res.json({id: user.id, username: user.username}))
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
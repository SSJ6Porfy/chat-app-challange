const User = require("../models").User;

module.exports = {
    create(req, res) {
        return User
            .create({ 
                username: req.body.username,
                
            })
            .then()
            .catch();
    }
};
const Message = require("../models/message");

module.exports = {
    create(req, res) {
        console.log(req.body);
        return Message
            .create({ 
                userId: req.body.userId,
                sent: req.body.sent,
                body: req.body.body
            })
            .then(message => res.status(201).send(message))
            .catch(error => res.status(400).send(error));
    },
    index(req, res) {
        console.log(req.params);
        return Message
            .findAll({
                where: { userId: req.params.userId }
            })
            .then(messages => res.status(201).send(messages))
            .catch(error => res.status(400).send(error));
    },
    show(req, res) {
        return Message
            .findById(req.params.id)
            .then(message => res.status(201).send(message))
            .catch(error => res.status(400).send(error));
    },
};
const Message = require("../models/index").db.Message;

module.exports = {
    create(req, res) {
        console.log(req.body.message, "inside create");
        return Message
            .create({
                userId: req.body.message.userId,
                senderId: req.body.message.senderId,
                recipientId: req.body.message.recipientId,
                body: req.body.message.body
            })
            .then(message => res.json(message))
            .catch(error => res.status(400).send(error));
    },
    index(req, res) { 
        console.log(req.sessionID);  
        return Message
            .findAll({
                where: { 
                    userId: req.params.userId,
                    senderId: req.query.senderId,
                    recipientId: req.query.recipientId
                 }
            })
            .then(messages => res.json(messages))
            .catch(error => res.status(400).send(error));
    },
    show(req, res) {
        return Message
            .findById(req.params.id)
            .then(message => res.json(message))
            .catch(error => res.status(400).send(error));
    },
};
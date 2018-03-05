const Message = require("../models").Message;

module.exports = {
    create(req, res) {
        return Message
            .create({
                userId: req.body.message.userId,
                senderId: req.body.message.senderId,
                recipientId: req.body.message.recipientId,
                chatroomId: req.body.message.chatroomId,
                body: req.body.message.body
            })
            .then(message => res.json(message))
            .catch(error => res.status(400).send(error));
    },
    index(req, res) {
        return Message
            .findAll({
                where: { 
                    userId: req.params.userId
                 }
            })
            .then(messages => res.json(messages))
            .catch(error => res.status(400).send(error));
    },
    show(req, res) {
        return Message
            .findById(req.params.messageId)
            .then(message => res.json(message))
            .catch(error => res.status(400).send(error));
    },
};
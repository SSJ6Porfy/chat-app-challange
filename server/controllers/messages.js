const Message = require("../models").Message;
const Op = require('sequelize').Op;

module.exports = {
    create(req, res) {
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
        return Message
            .findAll({
                where: { 
                    userId: req.params.userId,
                    senderId: { [Op.or]: [req.query.senderId,req.query.recipientId]},
                    recipientId: { [Op.or]: [req.query.senderId,req.query.recipientId]}
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
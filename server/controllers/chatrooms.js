const Chatroom = require("../models").Chatroom;
module.exports = {
    create(req, res) {
        return Chatroom
            .create({
                userId: req.body.chatroom.userId,
                participantOneId: req.body.chatroom.participantOneId,
                participantTwoId: req.body.chatroom.participantTwoId,
            })
            .then(chatroom => res.json(chatroom))
            .catch(error => res.status(400).send(error));
    },
    index(req, res) {
        return Chatroom
            .findAll({
                where: { 
                    userId: req.params.userId,
                 }
            })
            .then(chatrooms => res.json(chatrooms))
            .catch(error => res.status(400).send(error));
    },
    show(req, res) {
        return Chatroom
            .findOne({ where: { userId: req.query.userId }})
            .then(chatroom => res.json(chatroom))
            .catch(error => res.status(400).send(error));
    }
};
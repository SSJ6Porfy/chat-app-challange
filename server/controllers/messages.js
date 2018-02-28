const Message = require("../models/index").db.Message;

module.exports = {
    create(req, res) {
        return Message
            .create({ 
                senderId: req.body.senderId,
                recipientId: req.body.recipientId,
                body: req.body.body
            })
            .then(message => res.json(message))
            .catch(error => res.status(400).send(error));
    },
    index(req, res) { 
        console.log(req.query);  
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
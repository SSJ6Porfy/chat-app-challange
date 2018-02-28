const User = require('../models/index').db.User;
const Message = require("../models/index").db.Message;

const user1 = User.create({ username: "Porfy", passwordDigest: "abcdef" });
const user2 = User.create({ username: "Rob", passwordDigest: "abcdef" });
const user3 = User.create({ username: "Laura", passwordDigest: "abcdef" });

const message1 = Message.create({ userId: 1, senderId: 3, recipientId: 2, body: "test 1" });
const message2 = Message.create({ userId: 1, senderId: 3, recipientId: 2, body: "test 2" });
const message3 = Message.create({ userId: 1, senderId: 2, recipientId: 3, body: "test 3" });
const message4 = Message.create({ userId: 1, senderId: 2, recipientId: 3, body: "test 4" });
const message5 = Message.create({ userId: 2, senderId: 2, recipientId: 1, body: "test 5" });
const message6 = Message.create({ userId: 2, senderId: 2, recipientId: 3, body: "test 6" });
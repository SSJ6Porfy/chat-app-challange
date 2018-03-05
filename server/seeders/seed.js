const User = require('../models/index').User;
const Message = require("../models/index").Message;
const Chatroom = require("../models/index").Chatroom;

const user1 = User.create({ username: "demo", passwordDigest: "1234567890" });
const user2 = User.create({ username: "Laura", passwordDigest: "abcdef" });
const user3 = User.create({ username: "Rob", passwordDigest: "abcdef" });


const chat1 = Chatroom.create({ userId: 1, 
                                participantOneId: 2, 
                                participantTwoId: 3 });

const message1 = Message.create({ userId: 1, 
                                  senderId: 3, 
                                  recipientId: 2, 
                                  body: "pop quiz hot shot!", 
                                  chatroomId: 1 });

const message2 = Message.create({ userId: 1, 
                                  senderId: 2, 
                                  recipientId: 3, 
                                  body: "here we go again! lol", 
                                  chatroomId: 1 });

const message3 = Message.create({ userId: 1, 
                                  senderId: 3, 
                                  recipientId: 2, 
                                  body: "what's the time complexity of iterating thru a matrix?", 
                                  chatroomId: 1 });
                                  
const message4 = Message.create({ userId: 1, 
                                  senderId: 2, 
                                  recipientId: 3, 
                                  body: "uh! hmm...", 
                                  chatroomId: 1 });
                                  
const message5 = Message.create({ userId: 1, 
                                  senderId: 2, 
                                  recipientId: 3, 
                                  body: "I say quadratic! O(n**2)", 
                                  chatroomId: 1 });
                                  
const message6 = Message.create({ userId: 1, 
                                  senderId: 3, 
                                  recipientId: 2, 
                                  body: "Nope!", 
                                  chatroomId: 1 });

const message7 = Message.create({ userId: 1, 
                                  senderId: 3, 
                                  recipientId: 2, 
                                  body: "Its O(n)", 
                                  chatroomId: 1 });

const message8 = Message.create({ userId: 1, 
                                  senderId: 2, 
                                  recipientId: 3, 
                                  body: "are you sure?", 
                                  chatroomId: 1 });

const message9 = Message.create({ userId: 1, 
                                  senderId: 2, 
                                  recipientId: 3, 
                                  body: "aren't there nested loops?", 
                                  chatroomId: 1 });

const message10 = Message.create({ userId: 1, 
                                  senderId: 3, 
                                  recipientId: 2, 
                                  body: "yes but we're only visiting each node once! Hence Linear", 
                                  chatroomId: 1 });
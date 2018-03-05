import * as ChatroomAPIUtil from "../utils/chatroom_utils";

export const RECEIVE_NOTIFICATION = 'RECEIVE_NOTIFICATION';
export const RECEIVE_CHATROOM = 'RECEIVE_CHATROOM';


export const fetchNotification = (chatroomId, senderId) => dispatch => (
    ChatroomAPIUtil.fetchNotification(chatroomId, senderId)
    .then(res => (dispatch(receiveNotification(res.data))
    ), err => (dispatch(receiveNotificationErrors(err.response.data.errors))))
);

export const fetchChatroom = (userId) => dispatch => (
    ChatroomAPIUtil.fetchChatroom(userId)
    .then(res => (dispatch(receiveChatroom(res.data))
    ), err => (dispatch(receiveChatroomErrors(err.response.data.errors))))
);

export const createChatroom = (chatroom) => dispatch => (
    ChatroomAPIUtil.createChatroom(chatroom)
    .then(res => (dispatch(receiveChatroom(res.data))
    ), err => (dispatch(receiveChatroomErrors(err.response.data.errors))))
);

export const receiveChatroom = (chatroom) => ({
  type: RECEIVE_CHATROOM,
  chatroom
});
export const receiveChatroomErrors = (errors) => ({
  type: RECEIVE_CHATROOM,
  errors
});

export const receiveNotification = (notification) => ({
  type: RECEIVE_NOTIFICATION,
  notification
});

export const receiveNotificationErrors = (errors) => ({
    type: RECEIVE_NOTIFICATION,
    errors
  });


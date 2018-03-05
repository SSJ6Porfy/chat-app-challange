import * as ChatroomAPIUtil from "../utils/chatroom_utils";

export const RECEIVE_CHATROOM = 'RECEIVE_CHATROOM';


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

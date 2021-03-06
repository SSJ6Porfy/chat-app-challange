import * as MessageAPIUtil from "../utils/message_utils";

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE_ERRORS = 'RECEIVE_MESSAGE_ERRORS';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const fetchMessages = (userId) => dispatch => (
  MessageAPIUtil.fetchMessages(userId)
    .then(res => (dispatch(receiveMessages(res.data))
    ), err => (dispatch(receiveMessageErrors(err.response.data.errors))))
);

export const createMessage = (message) => dispatch => (
  MessageAPIUtil.createMessage(message)
    .then(res => (dispatch(receiveMessage(res.data))
    ), err => (dispatch(receiveMessageErrors(err.response.data.errors))))
);


export const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages
});

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  message
});

export const receiveMessageErrors = (errors) => ({
    type: RECEIVE_MESSAGE_ERRORS,
    errors
});
  
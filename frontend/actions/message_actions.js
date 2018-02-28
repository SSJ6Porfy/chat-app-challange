import * as MessageAPIUtil from "../utils/message_utils";

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE_ERRORS = 'RECEIVE_MESSAGE_ERRORS';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const fetchMessages = (userId, recipientId) => dispatch => (
  MessageAPIUtil.fetchMessages(userId, recipientId)
    .then(res => (dispatch(receiveMessages(res.data))
    ), err => (dispatch(receiveMessageErrors(err.responseJSON))))
);

export const createMessage = (message) => dispatch => (
  MessageAPIUtil.createMessage(message)
    .then(res => (dispatch(receiveMessage(res.data))
    ), err => (dispatch(receiveMessageErrors(err.responseJSON))))
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
  
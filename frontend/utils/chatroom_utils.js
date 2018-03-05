import axios from 'axios';

export const createChatroom = (chatroom) => (
  axios({
    method: 'POST',
    url: '/api/chatrooms',
    data: { chatroom }
  })
);

export const fetchChatroom = (userId) => {
  let userQuery = userId ?`?userId=${userId}` : "";
  return axios({
    method: 'GET',
    url: `/api/chatrooms${userQuery}`,
  });
};
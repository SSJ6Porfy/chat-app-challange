import axios from 'axios';

export const fetchMessages = (userId, senderId,recipientId) => {
  let recipientQuery = recipientId && senderId ? `?recipientId=${recipientId}&senderId=${senderId}` : "";
  return axios({
    method: 'GET',
    url: `/api/users/${userId}/messages${recipientQuery}`
  });
};

export const createMessage = (message) => {
  return axios({
    method: 'POST',
    url: '/api/messages',
    data: { message }
  });
};


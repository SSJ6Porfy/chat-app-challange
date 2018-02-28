import axios from 'axios';

export const fetchMessages = (userId, recipientId) => {
  let recipientQuery = recipientId ? `?recipientId=${recipientId}` : "";
  console.log("called here", recipientQuery);
  return axios({
    method: 'GET',
    url: `/api/users/${userId}/messages${recipientQuery}`
  });
};

export const createMessage = (message) => (
  axios({
    method: 'POST',
    url: '/api/messages',
    data: { message }
  })
);


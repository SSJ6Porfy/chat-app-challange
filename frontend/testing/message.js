import request from './request_messages';

export function fetchMessage(messageId) {
  return request('/api/messages/' + messageId).then(message => message.body);
}
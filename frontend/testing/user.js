import request from './request_users';

export function fetchUser(userID) {
  return request('/api/users/' + userID).then(user => user.name);
}
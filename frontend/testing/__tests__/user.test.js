jest.mock('../request_users');


import * as user from '../user';

// The assertion for a promise must be returned.
it('works with promises', () => {
  expect.assertions(1);
  return expect(user.fetchUser(1)).resolves.toEqual('Porfy');
});

it('works with promises', () => {
  expect.assertions(1);
  return expect(user.fetchUser(2)).resolves.toEqual('Demo');
});



jest.mock('../request_messages');


import * as message from '../message';

// The assertion for a promise must be returned.
it('works with promises', () => {
  expect.assertions(1);
  return expect(message.fetchMessage(1)).resolves.toEqual('I am a test message 1');
});

it('works with promises', () => {
  expect.assertions(1);
  return expect(message.fetchMessage(2)).resolves.toEqual('I am a test message 2');
});

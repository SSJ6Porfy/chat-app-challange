const messages = {
    1: {body: 'I am a test message 1'},
    2: {body: 'I am a test message 2'},
  };
  
export default function request(url) {
    return new Promise((resolve, reject) => {
      const messageId = parseInt(url.substr('/api/messages/'.length), 10);
      process.nextTick(
        () =>
          messages[messageId]
            ? resolve(messages[messageId])
            : reject({
                error: 'Message with ' + messageId + ' not found.',
              }),
      );
    });
  }
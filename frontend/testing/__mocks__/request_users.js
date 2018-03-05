const users = {
    1: {name: 'Porfy'},
    2: {name: 'Demo'},
  };
  
export default function request(url) {
    return new Promise((resolve, reject) => {
      const userID = parseInt(url.substr('/api/users/'.length), 10);
      process.nextTick(
        () =>
          users[userID]
            ? resolve(users[userID])
            : reject({
                error: 'User with ' + userID + ' not found.',
              }),
      );
    });
  }
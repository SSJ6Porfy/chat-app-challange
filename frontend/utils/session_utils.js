import axios from 'axios';

export const login = user => (
    axios({
      method: 'POST',
      url: '/api/session',
      data: { user }
    })
  );
  
  export const signup = user => (
    axios({
      method: 'POST',
      url: '/api/users',
      data: { user }
    })
  );
  
  export const logout = () => (
    axios({
      method: 'DELETE',
      url: '/api/session'
    })
  );
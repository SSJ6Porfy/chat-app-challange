import axios from 'axios';

export const login = user => (
    axios({
      method: 'POST',
      url: '/api/login',
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
      method: 'GET',
      url: '/api/logout'
    })
  );
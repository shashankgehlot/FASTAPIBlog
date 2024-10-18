// src/utils/auth.js
// import jwt_decode from 'jsonwebtoken'; // Import the jsonwebtoken library
import { jwtDecode } from 'jwt-decode'; // Named import


export const storeToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
    }
  };
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };

  export const decodeToken = () => {
    const token = getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }


  export const fetchAuthorData = async () => {
    const decodedToken = decodeToken();
    if (decodedToken && decodedToken.user_id) {
      const userId = decodedToken.user_id;
      const url = `/api/author/user/${userId}`;
      const options = {};
      options.method = 'GET';
      options.headers = { 'Content-Type': 'application/json' };
      if (decodedToken) {
        options.headers['Authorization'] = `Bearer ${getToken()}`;
      }
      return await fetch(url, options)
    } else {
      throw new Error('User ID is missing in the decoded token');
    }
  };
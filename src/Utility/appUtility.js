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
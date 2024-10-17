// src/hooks/useFetch.js
import { fetchReducer, initialState } from '../reducers/fetchReducer';
import { storeToken, getToken } from '../Utility/appUtility';
import { useNavigate } from 'react-router-dom';
import { useReducer } from 'react';

const useFetch = () => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const navigate = useNavigate();
  const fetchData = async (url, method = 'GET', body = null, contentType = 'application/json', includeToken = false) => {
    dispatch({ type: 'FETCH_INIT' });
    try {
      const options = {
        method,
        headers: {
          'Content-Type': contentType,
        },
      };
      if (includeToken) {
        const token = getToken();
        if (token) {
          options.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      if (body) {
        if (contentType === 'application/json') {
          options.body = JSON.stringify(body); // Stringify the body if content type is JSON
          // options.body = body;
        } else if (contentType === 'application/x-www-form-urlencoded') {
          options.body = body.toString(); // Convert URLSearchParams to string if content type is URL-encoded
        }
      }
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result.access_token) {
        storeToken(result.access_token); // Use the utility function to store the token
        navigate('/'); // Redirect to /blog/page
      }
      dispatch({ type: 'FETCH_SUCCESS', payload: result });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE', payload: err.message });
    }
  };

  return { ...state, fetchData };
};

export default useFetch;

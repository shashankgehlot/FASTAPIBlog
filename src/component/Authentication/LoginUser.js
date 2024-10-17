// src/components/Login.js
import React from 'react';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';

const Login = () => {
  const { values, handleChange, resetForm } = useForm({ username: '', password: '' });
  const { data, loading, error, fetchData } = useFetch();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Convert form values to URL-encoded format
    const formBody = new URLSearchParams();
    for (const key in values) {
      formBody.append(key, values[key]);
    }

    // Call fetchData with the appropriate content type
    await fetchData('/api/auth/login', 'POST', formBody, 'application/x-www-form-urlencoded');
    resetForm(); // Reset the form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div>Error: {error}</div>}
      {data && <div>Login successful: {JSON.stringify(data)}</div>}
    </form>
  );
};

export default Login;

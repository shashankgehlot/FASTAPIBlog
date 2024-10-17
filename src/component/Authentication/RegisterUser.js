// src/components/Register.js
import React from 'react';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';

const Register = () => {
  const { values, handleChange, resetForm } = useForm({ username: '', email: '', password: '' });
  const { data, loading, error, fetchData } = useFetch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values);
    await fetchData('/api/auth/register', 'POST', values);
    // resetForm(); // Reset the form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div>
        <label>
          Username:
          <input type="text" name="username" value={values.username} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={values.email} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" value={values.password} onChange={handleChange} required />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <div>Error: {error}</div>}
      {data && <div>Registration successful: {JSON.stringify(data)}</div>}
    </form>
  );
};

export default Register;

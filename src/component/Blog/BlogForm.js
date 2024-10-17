// src/components/BlogForm.js
import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import TextInput from '../../UiElements/TextInput';
import RichTextEditor from '../../UiElements/RichTextEditor';
import { decodeToken } from '../../Utility/appUtility';
const BlogForm = () => {
    const { values, handleChange, resetForm } = useForm({ title: '' });
    const { data, loading, error, fetchData } = useFetch();
    const [content, setContent] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log('Form Content:', content); // Log content before submission
      console.log('Form Content:', localStorage.token('token')); // Log content before submission
      console.log('Decoded token:', decodeToken()); // Log values before submission
      const postData = {
        title: values.title,
        content: content,
        author_id:'6710a263a16b7637b669b60d'
      };
      console.log(postData); // Log the entire postData object
      await fetchData('/api/blog/posts/', 'POST', postData, 'application/json', true); // Include the token
      // resetForm();
      // setContent('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title:"
          name="title"
          value={values.title}
          onChange={handleChange}
          required
        />
        <label>Content:</label>
        <RichTextEditor
          value={content}
          onChange={setContent}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
        {error && <div>Error: {error}</div>}
        {data && <div>Post successful: {JSON.stringify(data)}</div>}
      </form>
    );
  };
  
  export default BlogForm;
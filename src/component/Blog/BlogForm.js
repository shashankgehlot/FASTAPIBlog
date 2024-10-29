// src/components/BlogForm.js
import React, { useState, useEffect } from 'react';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import TextInput from '../../UiElements/TextInput';
import TagsInput from '../../UiElements/TagInput';
import RichTextEditor from '../../UiElements/RichTextEditor';
import { fetchAuthorData } from '../../Utility/appUtility';

const BlogForm = () => {
  const { values, handleChange, resetForm } = useForm({ title: '' });
  const { data: postData, loading: postLoading, error: postError, fetchData: postFetchData } = useFetch();
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAuthorData(); // Fetch the author data
        const author = await response.json(); // Convert response to JSON
        setAuthorId(author.id); // Assuming author has an id field
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(); // Call the function to fetch data
  }, []); // Add dependencies if needed




  const handleSubmit = async (event) => {

    event.preventDefault();

    const formattedTags = [];
    for (let i = 0; i < tags.length; i++) {
        formattedTags.push({ title: tags[i] });
    }
    // const formattedTags = tags.map(tag => ({ title: tag }));
    const postData = {
      title: values.title,
      content: content,
      author_id: authorId,
      tags: formattedTags
    };
    console.log(postData); // Log the entire postData object
    await postFetchData('/api/blog/posts/', 'POST', postData, 'application/json', true); // Include the token
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
      <TagsInput tags={tags} setTags={setTags} />

      <button type="submit" disabled={postLoading}>
        {postLoading ? 'Posting...' : 'Post'}
      </button>
      
      {/* {authorLoading && <div>Loading author...</div>}
      {authorError && <div>Error fetching author: {authorError}</div>}
      {authorData && <div>Author: {JSON.stringify(authorData)}</div>} */}
      
      {postError && <div>Error posting blog: {postError}</div>}
      {postData && <div>Post successful: {JSON.stringify(postData)}</div>}
    </form>
  );
}

export default BlogForm;
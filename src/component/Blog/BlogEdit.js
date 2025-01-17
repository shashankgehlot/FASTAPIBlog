import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import TextInput from '../../UiElements/TextInput';
import RichTextEditor from '../../UiElements/RichTextEditor';
import { useParams } from 'react-router-dom';
import TagsInput from '../../UiElements/TagInput';

const BlogForm = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const { values, handleChange, setFormValues } = useForm({ title: '', content: '' ,tags: []});
  const { data: post, loading, error, fetchData: postFetchData } = useFetch();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Fetch the blog data for editing
    const fetchBlogData = async () => {
      try {
        await postFetchData(`/api/blog/posts/id/${id}`, 'GET');
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogData();
  }, [id]); // Dependencies

  useEffect(() => {
    if (post) {
      setFormValues({ title: post.title, content: post.content});
      setTags(post.tags);
    }
  }, [post]); // Depend on post


  const handleContentChange = (content) => {
    setFormValues({ content }); // Update content field in form values
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedTags = tags.map(tag => ({ title: tag }));
    const updatedpost = {...values, tags: formattedTags};
    try {
      await postFetchData(`/api/blog/posts/${id}`, 'PUT', updatedpost,'application/json', true);
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      {post ? (
        <>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              required
            />
            <label>Content</label>
            <RichTextEditor
              name="content"
              value={values.content}
              onChange={handleContentChange}
            />
            <TagsInput tags={tags} setTags={setTags} />

            <button type="submit">Update Post</button>
          </form>
        </>
        
      ) : (
        <div>No post found</div>
      )}
    </div>
  );
};

export default BlogForm;

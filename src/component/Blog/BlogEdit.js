import React, { useEffect, useState, useRef } from 'react';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import TextInput from '../../UiElements/TextInput';
import RichTextEditor from '../../UiElements/RichTextEditor';
import { useParams } from 'react-router-dom';
import TagsInput from '../../UiElements/TagInput';
import ImageUploadInput from '../../UiElements/ImageInput';
const BlogForm = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const { values, handleChange, setFormValues } = useForm({ title: '', content: '', tags: [], thumbnail_base64: '', post_image_base64: '' });
  const { data: post, loading, error, fetchData: postFetchData } = useFetch();
  const [tags, setTags] = useState([]);
  const [imageBase64, setImageBase64] = useState('');
  const [postImageBase64, setPostImageBase64] = useState('');
  const quillRef = useRef(null);

  // Fetch the blog data for editing
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        await postFetchData(`/api/blog/posts/id/${id}`, 'GET');
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogData();
  }, [id]);

  // Set form values once the post is fetched
  useEffect(() => {
    if (post) {
      setFormValues({ title: post.title, content: post.content, thumbnail_base64: post.thumbnail_base64, post_image_base64: post.post_image_base64 });
      setTags(post.tags);
    }
  }, [post]);

  const handleContentChange = (content) => {
    setFormValues({ content }); // Update content field in form values
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Format tags for submission
    const formattedTags = tags.map(tag => ({ title: tag }));
    const updatedPost = { ...values, tags: formattedTags };

    try {
      await postFetchData(`/api/blog/posts/${id}`, 'PUT', updatedPost, 'application/json', true);
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // Consider adding a spinner component here
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="blog-form-container">
      {post ? (
        <form onSubmit={handleSubmit} id="form-edit">
          <h1>Edit Blog Post</h1>
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
            ref={quillRef}
          />
          <TagsInput tags={tags} setTags={setTags} />

          <ImageUploadInput
            label="Upload thumbnail:"
            name="thumbnail_base64"
            value={values.thumbnail_base64}
            onChange={setImageBase64}
          />
          <ImageUploadInput
            label="Upload post:"
            name="thumbnail_base64"
            value={values.post_image_base64}
            onChange={setPostImageBase64}
          />
          <button type="submit" id="update-post-btn">Update Post</button>
        </form>
      ) : (
        <div>No post found</div>
      )}
    </div>
  );
};

export default BlogForm;

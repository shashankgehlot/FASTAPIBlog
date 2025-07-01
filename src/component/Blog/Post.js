import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ReactQuill from 'react-quill';
// import './Post.css'; // Import the CSS file

const Post = () => {
  const { slug } = useParams();
  const { data: post, loading, error, fetchData } = useFetch();
  const quillRef = useRef(null);

  useEffect(() => {
    fetchData(`/api/blog/posts/slug/${slug}`);
  }, [slug]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="post-container">
      {post ? (
        <>
          {post.post_image_base64 ? (
            <img src={`${post.post_image_base64}`} alt="Post Thumbnail" />
          ) : (
            <img
              src="https://plus.unsplash.com/premium_photo-1661596686441-611034b8077e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Fallback Image"
              className="tile-thumbnail"
            />
          )}
          <h1>{post.title}</h1>
          <ReactQuill
            ref={quillRef}
            value={post.content}
            readOnly={true}
            theme="snow"
            modules={{ toolbar: false }} // Disable the toolbar
          />
          {post.tags && post.tags.length > 0 ? (
            <div className="tags-container">
              {post.tags.map((tag) => (
                <span key={tag}>
                  <Link to={`/topics/?tag=${tag}`}>
                    <i className="fa fa-tag" aria-hidden="true"></i> {tag}
                  </Link>
                </span>
              ))}
            </div>
          ) : (
            <span>No tags available</span>
          )}
        </>
      ) : (
        <div>No post found</div>
      )}
    </div>
  );
};

export default Post;

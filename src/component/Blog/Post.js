import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ReactQuill from 'react-quill';

const Post = () => {
  const { slug } = useParams();
  const { data: post, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`/api/blog/posts/slug/${slug}`);
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return  (
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <ReactQuill
            value={post.content}
            readOnly={true}
            theme="snow"
            modules={{ toolbar: false }} // Disable the toolbar
          />
        </>
      ) : (
        <div>No post found</div>
      )}
    </div>
  );
};

export default Post;
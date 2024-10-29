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

  return (
    // <div>
    //   {post ? (
    //     <>
    //       <h1>{post.title}</h1>
    //       <ReactQuill
    //         value={post.content}
    //         readOnly={true}
    //         theme="snow"
    //         modules={{ toolbar: false }} // Disable the toolbar
    //       />
    //       {post.tags.map(tag => (
    //         <span key={tag}> <i class="fa fa-tag" aria-hidden="true"></i>  {tag} </span>
    //       ))}
    //     </>
    //   ) : (
    //     <div>No post found</div>
    //   )}
    // </div>
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
          {post.tags && post.tags.length > 0 ? (
            post.tags.map(tag => (
              <span key={tag}> <i className="fa fa-tag" aria-hidden="true"></i> {tag} </span>
            ))
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
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const Home = () => {
  const { data: posts, loading, error, fetchData } = useFetch();
  useEffect(() => {
    fetchData(`/api/blog/posts/`);
  }, []);

  return (
    <div>
      {posts ? (
        posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <Link to={`/post/${post.slug_title}`}>Read More</Link>
            <Link to={`/edit-blog/${post.id}`}>Edit</Link>
          </div>
        ))
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
};

export default Home;

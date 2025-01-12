import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
// import TagInput from './Tags/TagInput';
const Home = () => {
  const { data: posts, loading, error, fetchData } = useFetch();
  const query = new URLSearchParams(useLocation().search);
  const tag = query.get('tag'); // Get the value of the 'tag' parameter
  useEffect(() => {
    if (tag) {
      fetchData(`/api/blog/tagged-posts/?tags=${tag}`);
    } else {
      fetchData(`/api/blog/posts/`);
    }
  }, []);

  return (
    
    <div>
      <div>
        {/* <TagInput />   */}
      </div>
      {posts ? (
        posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <Link to={`/post/${post.slug_title}`}>Read More</Link>
            <Link to={`/edit-blog/${post.id}`}>Edit blog</Link>
          </div>
        ))
      ) : (
        <div>No posts available</div>
      )}
    </div>    
  );
};

export default Home;

import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/run');  // Adjust the endpoint as necessary
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre> // Print data as JSON
      ) : (
        <div>No data found.</div>
      )}
    </div>
  );
};

export default MyComponent;

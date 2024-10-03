import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // You can add logic here if needed
    // For example, navigate to the home page after a certain condition
    const timeout = setTimeout(() => {
      navigate('/'); // Navigate to home after a delay
    }, 3000); // 3 seconds delay

    // Cleanup function
    return () => clearTimeout(timeout);
  }, [navigate]); // Include navigate in the dependency array

  return (
    <div>
      <h1>Error 404: Page Not Found</h1>
      <p>Redirecting to home...</p>
    </div>
  );
};

export default Error404;

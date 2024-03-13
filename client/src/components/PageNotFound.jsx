import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PageNotFound.css'; // Import your CSS file for styling

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <p>Go back to <Link to="/">Homepage</Link>.</p>
    </div>
  );
}

export default PageNotFound;

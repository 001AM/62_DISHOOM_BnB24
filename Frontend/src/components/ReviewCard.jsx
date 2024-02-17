import React from 'react';


const ReviewCard = ({ customerName, rating, review }) => {
  const cardStyle = {
    display: 'inline-block',
    margin: '10px',
  };

  const containerStyle = {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  };

  const ratingStyle = {
    color: '#ffd700', // This is a typical color for representing stars
  };

  return (
    <div style={cardStyle}>
      <div style={containerStyle}>
        <h3>{customerName}</h3>
        <div style={ratingStyle}>{rating} stars</div>
        <p>{review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;

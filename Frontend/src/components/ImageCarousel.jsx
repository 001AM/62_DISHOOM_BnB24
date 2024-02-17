import React, { useState } from 'react';

import Stack from '@mui/material/Stack';

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [clickedImageIndex, setClickedImageIndex] = useState(null);
  const [hiData, setHiData] = useState(null);
  const [activeSection, setActiveSection] = useState('description');

  const handleImageClick = (index) => {
    setClickedImageIndex(index);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  const [starRating, setStarRating] = useState(0);

  // Function to handle star rating click
  const handleStarClick = (rating) => {
    setStarRating(rating);
  };

  // Number of reviews and total number of reviews
  const numberOfReviews = 103;
  const totalReviews = 5; // Assuming the reviews are out of 5


  return (
    <div className='grid grid-cols-1 gap-6 px-2 sm:grid-cols-6 md:grid-cols-12'>
      <div className='col-span-1 lg:col-span-9 sm:col-span-6'>
        <div className="grid grid-cols-8 gap-6">
          <div className="col-span-1">
            {images.map((image, index) => (
              <div key={index} className="row my-2 w-full" onClick={() => handleImageClick(index)}>
                <img src={image} alt={`carousel image ${index}`} className="w-auto h-auto" />
              </div>
            ))}
          </div>
          <div className="col-span-7">
            <div className="grid grid-cols-1 gap-6">
              <div className="row">
                <img
                  src={clickedImageIndex !== null ? images[clickedImageIndex] : images[currentImageIndex]}
                  alt="carousel image"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-3 sm:col-span-6">
        <div className="row">
          <h1>{hiData}Product Name</h1>

        </div>

      </div>

      <div className="col-span-12" style={{ backgroundColor: '#F9F4F1' }}>
  <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-6">
    <div className="lg:col-span-3 sm:col-span-6">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center justify-center">
        <h1 onClick={() => handleSectionClick('description')}>Description</h1>
        <h1 onClick={() => handleSectionClick('productDetail')}>Product Detail</h1>
        <h1 onClick={() => handleSectionClick('Sustainability')}>Sustainability</h1>
      </div>
      <div className="straight-line" style={{ background: "black", width: "50%", margin: "0 auto", borderTop: "1px solid #000" }}></div>
    </div>

    <div className="straight-line lg:hidden" style={{ width: "100%" }}></div>

    <div className="lg:col-span-9">
      {activeSection === 'description' && (
        <div className="lg:col-span-12" style={{ margin: "20px 10px" }}>
          <h3>Description</h3>
          <p>Insert description here</p>
        </div>
      )}
      {activeSection === 'productDetail' && (
        <div className="lg:col-span-12" style={{ margin: "20px 10px" }}>
          <h3>Product Detail</h3>
          <p>Insert product detail here</p>
        </div>
      )}
      {activeSection === 'Sustainability' && (
        <div className="lg:col-span-12" style={{ margin: "20px 10px" }}>
          <h3>Sustainability</h3>
          <p>Insert Sustainability here</p>
        </div>
      )}
    </div>
  </div>
</div>

      <div className="card rounded-lg shadow-xl p-4 col-span-12" style={{ margin: "10px" }}>
        <h1 style={{ textAlign: 'center' }}>Custom Review</h1>
        {/* Star Rating Bar */}
        <Stack spacing={1}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
                key={rating}
                className={`cursor-pointer ${rating <= starRating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => handleStarClick(rating)}
              >
                ★
              </span>
            ))}
            <span className="text-lg font-semibold ml-2">{starRating} / 5</span>
          </div>
          {/* Review Content */}

        </Stack>
        <p className="text-center m-2 text-gray-500">{numberOfReviews} reviews based on {totalReviews} total</p>
        <textarea
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your review here"
          rows={4}></textarea>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Post Review
          </button>
        </div>
      </div>
    </div>
  );
};


export default ImageCarousel;


import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExampleContext from '../../context/Context';

export default function Home() {
  
  const navigate = useNavigate();
  const { isLogin, setLogin } = useContext(ExampleContext);
  
  console.log(isLogin)
  return (
    <>
      <h1>Welcome to the Product Home Page</h1>
      {/* Add your product home page content here */}
      <div className="product-card" style={{ borderRadius: '10px' }}>
        {/* Add your product card content here */}
      </div>
    </>
  );
}
      {/* Add your product home page content here */}




 

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

function BaseLayout() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <nav className="top-0 w-full text-white absoulte">
          <Navbar />
        </nav>
        <div className="px-2 mt-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BaseLayout;

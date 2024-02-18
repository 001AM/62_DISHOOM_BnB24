import React from 'react';
import logo1 from "../assets/Logo1.png"
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer className="bg-green-950 shadow   max-w-full px-2 mx-auto sm:px-6 lg:px-8">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <Link to="/" className="logo">
                    <img className="w-auto h-12" src={logo1} alt="Your Company" />
                  </Link>
              
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white" > MADE IN EARTH </span>
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-white">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">About</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-white sm:text-center dark:text-white">© 2023 <a  className="hover:underline">made in earth™</a>. All Rights Reserved.</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;

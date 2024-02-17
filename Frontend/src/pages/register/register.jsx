// src/Signup.js
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExampleContext from '../../context/Context';
import { ToastContainer, toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa6";
import axios from 'axios'; // Import Axios

const Register = () => {
    const navigate = useNavigate();
    const { isLogin, setLogin } = useContext(ExampleContext);

    useEffect(() => {
        console.log('...', isLogin);
        if (isLogin) {
            navigate('/home');
        }
    }, [isLogin, navigate]);

    const handleSocialSignup = (provider) => {
        // Handle social signup logic here
        toast.success(`Signup with ${provider}`);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const response = await axios.post('https://api.interv.co.in/authentication/signup/', {
                username: e.target.username.value,
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                email: e.target.email.value,
                password: e.target.password.value,
            });

            // Check if the signup was successful (you may need to adjust this based on your API response)
            if (response.data.success) {
                console.log('Signup successful:', response.data);
                toast.success('Signup successful');
                setLogin(true);
                navigate('/home');
            } else {
                console.log('Signup failed:', response.data);
                toast.error('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            toast.error('Signup failed. Please try again.');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-black'>
            <div className="w-full h-auto max-w-md p-4 bg-white rounded-md shadow-md md:p-8 md:max-w-xl lg:max-w-2xl">
                <div className="text-center">
                    <div className="mb-2 text-xl font-bold md:text-4xl lg:text-5xl md:mb-4">Signup</div>
                    <form onSubmit={handleFormSubmit} className="mt-4 md:mt-8">
                        <div className="mb-2 md:mb-4">
                            <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded md:text-base focus:outline-none focus:shadow-outline"
                                id="username" type="text" placeholder="Enter your username" />
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded md:text-base focus:outline-none focus:shadow-outline"
                                id="firstName" type="text" placeholder="Enter your first name" />
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded md:text-base focus:outline-none focus:shadow-outline"
                                id="lastName" type="text" placeholder="Enter your last name" />
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded md:text-base focus:outline-none focus:shadow-outline"
                                id="email" type="email" placeholder="Enter your email address" />
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded md:text-base md:mb-3 focus:outline-none focus:shadow-outline"
                                id="password" type="password" placeholder="Enter your password" />
                        </div>
                        <div className="mb-4 md:mb-6">
                            <button
                                className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700 md:py-3 md:px-6 focus:outline-none focus:shadow-outline md:text-base">
                                Signup
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col items-center space-y-2 md:space-y-4">
                    <button
                        className="flex items-center px-2 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg shadow-md md:px-4 md:py-3 md:text-base hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        <FcGoogle />
                        <span className="ml-1 md:ml-2">Signup with Google</span>
                    </button>
                    <button
                        className="flex items-center px-2 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg shadow-md md:px-4 md:py-3 md:text-base hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        <FaGithub />
                        <span className="ml-1 md:ml-2">Signup with GitHub</span>
                    </button>
                    <button
                        className="flex items-center px-2 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg shadow-md md:px-4 md:py-3 md:text-base hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        <FaFacebook />
                        <span className="ml-1 md:ml-2">Signup with Facebook</span>
                    </button>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Register;

// src/Login.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExampleContext from '../../context/Context';
import axiosInstance from '../../axios';
import { ToastContainer, toast } from 'react-toastify';
import './login.css'; // Reuse the styling file
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa6";
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const { isLogin, setLogin } = useContext(ExampleContext);

    useEffect(() => {
        if (isLogin) {
            navigate('/home');
        }
    }, [isLogin, navigate]);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            axiosInstance
			.post(`authentication/login/`, {
                username : formData.username,
                password : formData.password
            })
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				toast.success('success')
                setLogin(true)
                navigate('/home')
				//console.log(res);
				//console.log(res.data);
			})
            .catch((error) => {
                console.error('Error:', error);
                toast.error("Registration failed");
            })
        } catch (error) {
            // Handle the error, e.g., show an error message to the user
            console.error('Registration failed:', error);
        }
    };

    const handleSignInWithGoogle = () => {
        toast.success('Sign in with Google');
    };

    const handleSignInWithGitHub = () => {
        toast.success('Sign in with GitHub');
    };

    const handleSignInWithFacebook = () => {
        toast.success('Sign in with Facebook');
    };
    

    return (
        <div className='flex items-center justify-center min-h-screen bg-black'>
            <div className="p-8 bg-white rounded shadow-md auth-container md:w-1/2 flex flex-col items-center">
                <div className="logo-title text-center text-4xl font-bold mb-8" style={{ color: 'black' }}>
                    Logo
                </div>
                <hr className="mx-auto w-1/2 border-t border-black mb-8" />
                
                <h1 className="text-3xl font-bold mb-8 text-center md:text-left" style={{ color: 'black' }}>Login</h1>
                
                <form onSubmit={handleSubmit} className="w-full">
                    <div class="mb-4">
                        <label class="block font-semibold text-gray-700 mb-2" for="email">
                            Email Address
                        </label>
                        <input
                            class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" type="email" placeholder="Enter your email address" />
                    </div>
                    <div class="mb-4">
                        <label class="block font-semibold text-gray-700 mb-2" for="password">
                            Password
                        </label>
                        <input
                            class="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" placeholder="Enter your password" />
                        <a class="text-gray-600 hover:text-gray-800" href="#">Forgot your password?</a>
                    </div>
                    <div class="mb-6">
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="button">
                            Login
                        </button>
                    </div>
                </form>

                <div className="flex flex-col space-y-2 md:space-y-4 items-center">
                    <button
                        className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm md:text-base font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full"
                        onClick={handleSignInWithGoogle}>
                        <FcGoogle />
                        <span className="ml-2">Sign in with Google</span>
                    </button>
                    <button
                        className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm md:text-base font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full"
                        onClick={handleSignInWithGitHub}>
                        <FaGithub />
                        <span className="ml-2">Sign in with GitHub</span>
                    </button>
                    <button
                        className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm md:text-base font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full"
                        onClick={handleSignInWithFacebook}>
                        <FaFacebook />
                        <span className="ml-2">Sign in with Facebook</span>
                    </button>
                </div>
                
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Login;

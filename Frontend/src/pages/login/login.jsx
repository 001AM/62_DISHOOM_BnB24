// src/Login.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExampleContext from '../../context/Context';
import axiosInstance from '../../axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import img from "../../assets/Bg.jpg"
import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const { isLogin, setLogin } = useContext(ExampleContext);

    useEffect(() => {
        if (isLogin) {
            navigate('/home');
        }
    }, [isLogin, navigate]);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const PostData = new FormData()
        PostData.append('email', formData.email)
        PostData.append('password', formData.password)
        try {
            console.log(PostData)
            axiosInstance
                .post(`authentication/login/`, PostData)
                .then((res) => {
                    localStorage.setItem('access_token', res.data.access);
                    localStorage.setItem('refresh_token', res.data.refresh);
                    axiosInstance.defaults.headers['Authorization'] =
                        'Bearer  ' + localStorage.getItem('access_token');
                    // toast.success('success')
                    setLogin(true)
                    navigate('/home')
                    //console.log(res);
                    //console.log(res.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    // toast.error("Registration failed");
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
        <>
            <div className='flex items-center justify-center min-h-screen bg-black' style={{ backgroundImage: `url(${img})` }}>
                <div className="flex flex-col items-center p-8 bg-white rounded shadow-md auth-container md:w-2/2 ">
                    <form onSubmit={handleSubmit} className="w-full ">
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold text-gray-700" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                                name="email" onChange={(e) => { handleChange(e) }} type="email" placeholder="Enter your email address" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold text-gray-700" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                                name="password" type="password" onChange={(e) => { handleChange(e) }} placeholder="Enter your password" />
                            <a className="text-gray-600 hover:text-gray-800" href="#">Forgot your password?</a>
                        </div>
                        <Link to="/register" style={{color:'black'}}>New User? SignUp</Link>
                        <div className="mb-6">
                            <button
                                className="mt-3 w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            </div>
        </>
    );
};


export default Login;

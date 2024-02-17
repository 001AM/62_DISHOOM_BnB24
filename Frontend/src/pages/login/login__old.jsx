// src/Login.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Change to useNavigate
import ExampleContext from '../../context/Context';
import axiosInstance from '../../axios';
import { ToastContainer, toast } from 'react-toastify';
import './login.css'; // Reuse the styling file

const Login = () => {
    const navigate = useNavigate(); // Use useNavigate instead of Navigate
    const { userid, setUserid, isLogin, setLogin, setUsername } = useContext(ExampleContext);

    useEffect(() => {
        console.log('...', isLogin)
        if (isLogin) {
            navigate('/home');
        }
    }, [isLogin, navigate]); // Include navigate in the dependency array
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

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="p-8 bg-white rounded shadow-md auth-container w-96">
                <h1 className="mb-4 text-2xl font-bold">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Email:</span>
                        <input
                            type="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="block w-full mt-1 form-input"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Password:</span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full mt-1 form-input"
                        />
                    </label>
                    <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>

    );
};

export default Login;

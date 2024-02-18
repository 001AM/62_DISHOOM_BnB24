// src/Login.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ExampleContext from '../../context/Context';
import axios from 'axios';
import img from "../../assets/Bg.jpg"

const Register = () => {
    const navigate = useNavigate();
    const { isLogin, setLogin } = useContext(ExampleContext);

    useEffect(() => {
        if (isLogin) {
            navigate('/home');
        }
    }, [isLogin, navigate]);


    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });
    const [passwordError, setPasswordError] = useState('');
    const [showTermsError, setShowTermsError] = useState(false);

    const updateFormData = (name, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value.trim(),
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormData(name, value);
        if (passwordError && (name === 'password' || name === 'confirmPassword')) {
            setPasswordError('');
        }
        if (showTermsError && name === 'termsAccepted') {
            setShowTermsError(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        if (!formData.termsAccepted) {
            setShowTermsError(true);
            return;
        }

        try {
            const response = await axios.post('https://api.interv.co.in/authentication/signup/', formData);
            console.log('Form submitted successfully:', response.data);
            // Handle successful form submission
        } catch (error) {
            console.error('Error submitting form', error);
            // Handle form submission error
        }
    };

    return (
        <div className='grid-cols-1 gap-6 px-2 sm:grid-cols-6 md:grid-cols-12 ' > 
            <div className='bg-white  col-span-1 lg:col-span-8 m-12 border-2 lg:w-2/5 flex-column justify-center items-center mx-auto'>
                <h1 className='text-center text-xl font-bold'>Sign-Up</h1>
                <div className='sm:col-span-1 md:col-span-4 lg:col-span-5 m-5'>
                    <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded md:text-base focus:outline-none focus:shadow-outline"
                        id="username" name="username" type="text" placeholder="Enter your username" value={formData.username} onChange={handleInputChange} />
                </div>
                <div className="m-5">
                    <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="first_name">
                        First Name
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded md:text-base focus:outline-none focus:shadow-outline"
                        id="first_name" name="first_name" type="text" placeholder="Enter First name" value={formData.first_name} onChange={handleInputChange} />
                </div>
                <div className="m-5">
                    <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded md:text-base focus:outline-none focus:shadow-outline"
                        id="last_name" name="last_name" type="text" placeholder="Enter Last name" value={formData.last_name} onChange={handleInputChange} />
                </div>
                <div className="m-5">
                    <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded md:text-base focus:outline-none focus:shadow-outline"
                        id="email" name="email" type="email" placeholder="Enter your email address" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="m-5">
                    <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded md:text-base md:mb-3 focus:outline-none focus:shadow-outline"
                        id="password" name="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} />
                </div>
                <div className="m-5">
                    <label style={{ textAlign: 'initial' }} className="block mb-1 text-sm font-semibold text-gray-700 md:text-base md:mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded md:text-base md:mb-3 focus:outline-none focus:shadow-outline"
                        id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleInputChange} />
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>
                <div className="m-5">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleInputChange}
                        />
                        <span className="ml-2 text-sm text-gray-700">I accept the <a href="/terms" className="underline">terms and conditions</a></span>
                    </label>
                    {showTermsError && <p className="text-red-500 text-sm">Please accept the terms and conditions</p>}
                </div>
                <div className=' flex justify-center mb-5'>
                    <button 
                        className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700 md:py-3 md:px-6 focus:outline-none focus:shadow-outline md:text-base" onClick={handleFormSubmit}>
                            <Link to="/userinfo">Signup</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;

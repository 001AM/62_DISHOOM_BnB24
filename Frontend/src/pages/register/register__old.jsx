import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Change to useNavigate
import ExampleContext from "../../context/Context";
import "../login/login.css"; // Create this file for styling
import axiosInstance from "../../axios";
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate(); // Use useNavigate instead of Navigate
  const { userid, setUserid, isLogin, setLogin, setUsername } =
    useContext(ExampleContext);

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: null, // New state for storing the selected image
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Check if the input is a file input for the image
    if (type === "file") {
      const file = e.target.files[0];
      setFormData({ ...formData, profileImage: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    //   if (formData.password1 !== formData.password2) {
    //     toast.error("Passwords do not match");
    //     return;
    //   }
      axiosInstance
        .post(`authentication/signup/`, {
          email: formData.email,
          username: formData.username,
        //   phone: formData.phone,
          password: formData.password,
        })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          axiosInstance.defaults.headers["Authorization"] =
            "JWT " + localStorage.getItem("access_token");
          toast.success("success");
          setLogin(true);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Registration failed");
        });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 bg-white rounded shadow-md auth-container w-96">
        <h1 className="mb-4 text-2xl font-bold">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Username:</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full mt-1 text-black form-input"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Email:</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-1 text-black form-input"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Password:</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full mt-1 text-black form-input"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Profile Image:</span>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
              className="block w-full mt-1 text-black form-input"
            />
          </label>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Register;

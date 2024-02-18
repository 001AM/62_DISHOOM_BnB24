import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import arrow from "../../assets/arrow-right.svg";
import { FaCheckCircle } from "react-icons/fa";
// import axiosInstance from "../../axios";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [next, setNext] = useState(false);

  const NextPage = () => {
    const formdata = new FormData()
    formdata.append('email', email)
    axios
      .post(`https://api.interv.co.in/authentication/forgotpassword/`, formdata)
      .then((res) => {
        if (res?.data?.success === true) {
          setNext(true);
        } else {
          setNext(false);
          toast.error("Email not found"); 
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (

    <div className="flex flex-col h-screen">
       <ToastContainer />
      <div className="grid h-full grid-cols-1 gap-6 px-2 sm:grid-cols-6 md:grid-cols-12">
        <div className="hidden w-full col-span-1 md:col-span-4 md:block sm:block"></div>
        <div className="flex items-center justify-center h-full col-span-1 lg:col-span-4 sm:col-span-4">
          {!next ? (
            <div className="flex flex-col items-center justify-center w-full p-4 mx-auto h-42 bg-slate-300 rounded-md">
              <FaLock size={150} />
              <h2 className="text-center" style={{ fontSize: "40px" }}>
                Forgot Password?
              </h2>
              <p style={{ fontSize: "15px" }}>
                You can reset your password here.
              </p>
              <div className="flex items-center w-full gap-0 m-1 border-2 rounded-lg border-slate-900">
                <input
                  id="email"
                  name="email"
                  placeholder="email address"
                  className="m-0 rounded-md"
                  type="email"
                  value={email}
                  onChange={handleChange}
                />
                <div className="w-10 h-full" onClick={NextPage}>
                  {/* Arrow button */}
                  <img className="w-auto h-auto" src={arrow} alt="arrow" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full p-4 mx-auto h-42 bg-green-400 rounded-md">
              <div className="flex flex-col items-center w-full gap-2 m-1 rounded-lg">
              <FaCheckCircle size={50} />
                <h1>Check your Email </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

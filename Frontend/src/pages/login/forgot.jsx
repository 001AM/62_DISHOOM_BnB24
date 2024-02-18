import axios from "axios";
import React, { useState } from "react";
import arrow from "../../assets/arrow-right.svg";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [next, setNext] = useState(false);
    const [sendData, setsendData ] = useState({
        password1:'',
        password2:''
    })
  const NextPage = () => {
    const formdata = new FormData()
    formdata.append('email', email)
    axios
      .post(`https://api.interv.co.in/authentication/forgotpassword/`, formdata)
      .then((res) => {
        if (res?.data?.success) {
          setNext(true);
        } else {
            
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const handleChange = (e) => {
    setEmail(`${e.target.value}`);
  }

  
  return (
    <div className="flex flex-col h-screen">
      <div className="grid h-full grid-cols-1 gap-6 px-2 sm:grid-cols-6 md:grid-cols-12">
        
      <div className="hidden w-full col-span-1 md:col-span-4 md:block sm:block"></div>
        <div className="flex items-center justify-center h-full col-span-1 lg:col-span-4 sm:col-span-4">
          { !next ? (
            <div className="flex items-center justify-center w-full p-4 mx-auto h-42 bg-slate-300">
              <div className="flex items-center w-full gap-0 m-1 border-2 rounded-lg border-slate-900">
                <input
                  className="m-0 rounded-md"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <div className="w-10 h-full" onClick={NextPage}>
                  <img className="w-auto h-auto" src={arrow} alt="arrow" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full p-4 mx-auto h-42 bg-slate-300">
              <div className="flex flex-col items-center w-full gap-2 m-1 rounded-lg">
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

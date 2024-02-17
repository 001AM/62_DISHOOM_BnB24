import axios from "axios";
import React, { useState } from "react";
import axiosInstance from "../../axios";
import arrow from "../../assets/arrow-right.svg";
import { useParams } from "react-router-dom";
function ConfirmPassword() {
  const {token} = useParams()
  const [next, setNext] = useState(false);
    const [sendData, setsendData ] = useState({
        token : token,
        password1:'',
        password2:''
    })
  const HandleSubmit = () => {
    const formdata = new FormData()
    formdata.append('token', sendData?.token)
    formdata.append('password', sendData?.password1)
    axios
      .post(`https://api.interv.co.in/authentication/password_save/`, formdata)
      .then((res) => {
        if (res?.data?.is_password) {
          setNext(true);
        } else {
            
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const handleChangePassword = (e, key) => {
    if (key === 1){
        setsendData((prevData) => ({
            ...prevData,
            password1: e.target.value
        }))
    } else if (key === 2){
        setsendData((prevData) => ({
            ...prevData,
            password2: e.target.value
        }))
    }
    
  };
  
  return (
    <div className="flex flex-col h-screen">
      <div className="grid h-full grid-cols-1 gap-6 px-2 sm:grid-cols-6 md:grid-cols-12">
        
      <div className="hidden w-full col-span-1 md:col-span-4 md:block sm:block"></div>
        <div className="flex items-center justify-center h-full col-span-1 lg:col-span-4 sm:col-span-4">
          { next ? (
            <div className="flex items-center justify-center w-full p-4 mx-auto h-42 bg-slate-300">
              <div className="flex items-center w-full gap-0 m-1 border-2 rounded-lg border-slate-900">
                <h1>Saved Successfully</h1>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full p-4 mx-auto h-42 bg-slate-300">
              <div className="flex flex-col items-center w-full gap-2 m-1 rounded-lg">
                <input
                  className="m-0 rounded-md"
                  type="password"
                  value={sendData.password1}
                  onChange={(e) => {
                    handleChangePassword(e,1);
                  }}
                />
                <input
                  className="m-0 rounded-md"
                  type="password"
                  value={sendData.password2}
                  onChange={(e) => {
                    handleChangePassword(e, 2);
                  }}
                />
                <div className="w-10 h-full" onClick={HandleSubmit}>
                    <button className="p-2 rounded-lg bg-blue-primary">Submit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmPassword;

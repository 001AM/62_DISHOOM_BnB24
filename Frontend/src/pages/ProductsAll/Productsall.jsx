import Card from "./Components/Card";
import img from "../../assets/71KO+B2m5wL._SX679_.jpg";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../config";
import Stack from "@mui/material/Stack";
import ReviewCard from "../../components/ReviewCard";
import axiosInstance from "../../axios";
import { Link } from "react-router-dom";

export default function Productsall() {
    const [info , setInfo] = useState([])
    const [searchValue, setSearchValue] =useState('')
    useEffect(() => {
        axios
          .get(`${BASE_URL}/product/get_products/?searchValue=${searchValue}`)
          .then((res) => {
            console.log(res?.data[0])
            const itemsData = res?.data?.map((item, index) => ({
                productname : `${item?.name}`,
                image: `${BASE_URL}${item?.images[0]?.product_image}`,
                productinfo : `${item?.description}`,
                link : `/product/${item?.id}`

            }));
            
            setInfo(itemsData)
            console.log(itemsData)
          })
          .catch((error) => {
            console.error("Error:", error);
          });
       
      }, [searchValue]);
    return (
        <div className="w-full h-full">
            <div className="ml-auto w-60  overflow-auto">
                <input type="text" className="rounded-sm" placeholder="Search Value" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-0">
            {info && info?.map((data, index) => (
                <Card
                    key={index}
                    image={data.image}
                    productname={data.productname}
                    productinfo={data.productinfo.substring(0, 100) + '...'}
                    link={data.link}
                />
            ))}
            { !info[0] ? (
                <h1 className="w-full font-bold text-2xl flex justify-center">
                    No Data Found
                </h1>
            ):(
                <></>
            ) 
            }
        </div>
        </div>
       
    );
}

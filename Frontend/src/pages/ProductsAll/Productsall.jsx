import Card from "./Components/Card";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config";

import Subcribe from '../../components/Subcribe';
import Footer from '../../components/Footer';
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
        <div className="col-span-1 sm:col-span-6 md:col-span-12">
      <Subcribe />

      <Footer className="w-10S" />

      </div>
        </div>
       
    );
}
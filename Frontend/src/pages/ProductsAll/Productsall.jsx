import React, { useEffect, useState } from "react";
import Card from "./Components/Card";
import img from "../../assets/71KO+B2m5wL._SX679_.jpg";
import axios from "axios";

export default function Productsall() {


    const [data, setData] = useState('')

    useEffect(() => {
        async function getdata() {
            try {
                const res = await axios.get('https://api.interv.co.in/product/products/getproducts');
                setData(res.data)
                console.log(res.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getdata();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-0">
            {Array.from({ length: 8 }).map((_, index) => (
                <Card
                    key={index}
                    image={img}
                    productname={"Nescafe"}
                    productinfo={"GIVE A FRESH START TO YOUR DAY with a sip of NESCAFE Classic Instant Coffee and let the bold taste with rich aroma of the instant coffee awaken your senses to new opportunities 100% PURE COFFEE"}
                />
            ))}
        </div>
    );
}

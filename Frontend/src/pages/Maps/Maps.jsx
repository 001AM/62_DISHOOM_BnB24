import React, { useEffect, useState } from 'react';
import Map from "../../components/Maps"
import Wastegen from "../../components/Wastegen"
import Barchart from "../../components/Barchart"
import axios from 'axios';

export default function Maps() {

    const [data, setData] = useState('')
    const [graphdata, setgraphdata] = useState('')
    const [name, setName] = useState('Product Name')
    const [activeButton, setActiveButton] = useState('Description');
    const [qa, setQa] = useState('Fssai');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    }

    useEffect(() => {
        async function getdata() {
            try {
                const res = await axios.get('https://api.interv.co.in/product/get_products/?product_id=4');
                setData(res.data)
                console.log(res.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getdata();
    }, []);

    useEffect(() => {
        async function getdata() {
            try {
                const response = await axios.get('https://api.interv.co.in/analysis/get_analytics/4/');
                setgraphdata(response.data)
                // console.log(response.data)
                console.log(graphdata.carbonfootprint)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getdata();
    }, []);

    return (
        <>
            <div className='flex justify-center text-4xl text-'>Nescafe {data.name}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div className='w-full'>
                    <Map />
                </div>
            </div>
            <div className='border-2 mx-12 mb-2'  >
                <div className='flex flex-row justify-between text-center mx-5 mt-5' style={{ overflow: 'scroll', overflowY: 'hidden' }}>
                    <button
                        className={activeButton === 'Description' ? 'bg-green-500 text-white' : 'bg-transparent text-black'}
                        onClick={() => handleButtonClick('Description')}
                        style={{ marginBottom: '20px' }}
                    >
                        Description
                    </button>
                    <button
                        className={activeButton === 'Product Info' ? 'bg-green-500 text-white' : 'bg-transparent text-black'}
                        onClick={() => handleButtonClick('Product Info')}
                        style={{ marginBottom: '20px' }}
                    >
                        Product Info
                    </button>
                    <button
                        className={activeButton === 'Environmental Impact' ? 'bg-green-500 text-white' : 'bg-transparent text-black'}
                        onClick={() => handleButtonClick('Environmental Impact')}
                        style={{ marginBottom: '20px' }}
                    >
                        Environmental Impact
                    </button>
                    <button
                        className={activeButton === 'Quality Control Metrics' ? 'bg-green-500 text-white' : 'bg-transparent text-black'}
                        onClick={() => handleButtonClick('Quality Control Metrics')}
                        style={{ marginBottom: '20px' }}
                    >
                        Quality Control Metrics
                    </button>
                    <button
                        className={activeButton === 'Ratings and Reviews' ? 'bg-green-500 text-white' : 'bg-transparent text-black'}
                        onClick={() => handleButtonClick('Ratings and Reviews')}
                        style={{ marginBottom: '20px' }}
                    >
                        Ratings and Reviews
                    </button>
                </div>
                <div className='m-12'>
                    <div className='h-auto w-100' >
                        {activeButton === 'Description' && (
                            <h1 style={{ width: '100%' }}>{data.description}</h1>
                        )}
                        {activeButton === 'Product Info' && (
                            <div className='h-full w-full' style={{ height: '40vh' }} ><Barchart style={{ height: '100%', width: '100%' }} /></div>
                        )}
                        {activeButton === 'Environmental Impact' && (
                            <div className="h-full w-full" style={{ height: '40vh' }}><Wastegen style={{ height: '100%', width: '100%' }} /></div>
                        )}
                        {activeButton === 'Quality Control Metrics' && (
                            <h1 className='font-bold text-2xl flex justify-start'>TradeMarks: {qa}</h1>
                        )}
                    </div>
                </div>
            </div >

        </>
    )
}

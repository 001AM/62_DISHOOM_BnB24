import React, { useEffect, useState } from 'react';
import Map from "../../components/Maps"
import Wastegen from "../../components/Wastegen"
import Barchart from "../../components/Barchart"
import axios from 'axios';

export default function Maps() {

    const [data, setData] = useState('')
    const [name, setName] = useState('Product Name')
    const [activeButton, setActiveButton] = useState('Description');
    const [desc, setDesc] = useState('`GIVE A FRESH START TO YOUR DAY with a sip of NESCAFE Classic Instant Coffee and let the bold taste with rich aroma of the instant coffee awaken your senses to new opportunities. 100% PURE COFFEE: NESCAFE Classic Instant Coffee is made from handpicked Robusta beans from South India that are slow-roasted to achieve the signature NESCAFE aroma. The perfect coffee flavour is extracted & locked in every coffee bean for the perfect cup at any time. EASY & CONVENIENT: NESCAFE offers a delightful coffee experience in a totally convenient way! You can be your own coffee artist and get great tasting coffee at home with the easy-to-prepare instant coffee powder. UNMISTAKABLE FLAVOUR: NESCAFE Classic Instant Coffee takes your coffee experiences to the next level with its unmistakable flavour. This instant coffee is made from roasted coffee beans that will make a coffee lover smile with sheer delight. It’s a coffee made for coffee lovers who enjoy a perfect blend. COMMONLY SEARCHED: coffee beans, coffee jar, morning coffee, roasted coffee beans, coffee beans roasted, fresh coffee beans, coffee nescafe, nescafe coffee morning, nescafe coffee kit, instant coffee, nescafe coffee kit, nescafe coffee mug, coffee kits, nescafe coffee classic, how to make nescafe classic coffee, coffee powder, coffee`');
    const [info, setInfo] = useState('');
    const [env, setEnv] = useState('');
    const [qa, setQa] = useState('Fssai');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    }

    useEffect(() => {
        async function getdata() {
          try {
            const res = await axios.get('https://api.interv.co.in/product/get_products/?product_id=6');
            setData(res.data)
            console.log(res.data)
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
                <div className='flex flex-row justify-between text-center mx-5 mt-5' style={{overflow:'scroll', overflowY:'hidden'}}>
                    <button
                        className={activeButton === 'Description' ? 'bg-green-500 text-white' : 'bg-transparent text-black'}
                        onClick={() => handleButtonClick('Description')}
                        style={{marginBottom:'20px'}}
                    >
                        Description
                    </button>
                    <button
                        className={activeButton === 'Product Info' ? 'bg-green-500 text-white' : 'bg-transparent text-black'}
                        onClick={() => handleButtonClick('Product Info')}
                        style={{marginBottom:'20px'}}
                    >
                        Product Info
                    </button>
                    <button
                        className={activeButton === 'Environmental Impact' ? 'bg-green-500 text-white' : 'bg-transparent text-black'}
                        onClick={() => handleButtonClick('Environmental Impact')}
                        style={{marginBottom:'20px'}}
                    >
                        Environmental Impact
                    </button>
                    <button
                        className={activeButton === 'Quality Control Metrics' ? 'bg-green-500 text-white' : 'bg-transparent text-black'}
                        onClick={() => handleButtonClick('Quality Control Metrics')}
                        style={{marginBottom:'20px'}}
                    >
                        Quality Control Metrics
                    </button>
                    <button
                        className={activeButton === 'Ratings and Reviews' ? 'bg-green-500 text-white' : 'bg-transparent text-black'}
                        onClick={() => handleButtonClick('Ratings and Reviews')}
                        style={{marginBottom:'20px'}}
                    >
                        Ratings and Reviews
                    </button>
                </div>
                <div className='m-12'>
                    <div className='h-96 w-96' >
                        {activeButton === 'Description' && (
                            <h1 style={{width:'100%'}}>{desc}</h1>
                        )}
                        {activeButton === 'Product Info' && (
                            <div className='h-full w-full'><Barchart style={{ height: '100%', width: '100%' }} /></div>
                        )}
                        {activeButton === 'Environmental Impact' && (
                            <div className="h-full w-full"><Wastegen style={{height:'100%', width:'100%'}}/></div>
                        )}
                        {activeButton === 'Quality Control Metrics' && (
                            <h1 className='font-bold text-2xl flex justify-center'>{qa}</h1>
                        )}
                    </div>
                </div>
            </div >

        </>
    )
}

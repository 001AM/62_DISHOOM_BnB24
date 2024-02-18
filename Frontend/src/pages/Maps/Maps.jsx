import React, { useState } from 'react';
import Map from "../../components/Maps"
import Barchart from '../../components/Barchart';

export default function Maps() {

    const [desc, setDesc] = useState('')
    const [info, setinfo] = useState('')
    const [env, setEnv] = useState('')
    const [qa, setQa] = useState('')

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div className='w-9/12'>
                    <Map />
                </div>
            </div>
            <div className='border-2 mx-12 mb-2' style={{ height: '100px' }}>
                <div className='grid grid-cols-5 gap-5 text-center mx-5 mt-5'>
                    <button>Description</button>
                    <button>Product Info</button>
                    <button>Environmental Impact</button>
                    <button>Quality Control Metrics</button>
                    <button>Ratings and Reviews</button>
                </div>
            </div>
            <div className='mb-5'>
            <div className='h-44 w-44 '>
                <Barchart />
            </div>
            </div>
        </>
    )
}

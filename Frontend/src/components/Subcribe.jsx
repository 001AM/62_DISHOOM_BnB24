import React from 'react'

function Subcribe() {
    return (
        <div>
            <div className="bg-gray-600 py-20">

                <div className="card  bg-white " style={{ margin: '1px 5% auto', padding: '2%', borderRadius: '15px' }} >
                    <div className="card-body">
                        <div className="container mx-auto px-6" >
                            <h2 className="text-4xl font-bold mb-2 text-gray-800">Subscribe to our Newsletter</h2>
                            <p className="text-gray-700 text-lg">Get the latest news from us</p>
                            <div className="flex items-center mt-7">
                                <input type="text" className=" m-0 w-full h-12 px-4 rounded-lg focus:outline-none bg-white" placeholder="Enter your email address" />
                                <button className="px-5 h-12 rounded-lg bg-green-600 text-white font-semibold text-lg ml-2">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Subcribe
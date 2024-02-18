import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Card(props) {

    return (
        <div className="w-4/5 mx-auto my-3 h-auto">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={props.link}>
                    <img className="rounded-t-lg h-48 mx-auto" src={props.image} alt="alt" />
                </Link>
                <div className="p-5">
                    <Link to={props.link}>
                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{props.productname}</h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">{props.productinfo}</p>
                    <Link to={props.link} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Go To Product
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>
            </div>

        </div>
    )
}
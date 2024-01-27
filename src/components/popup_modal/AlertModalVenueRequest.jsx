import axios from 'axios';
import React, { useState } from 'react';
import { BaseUrl } from '../../constant/BaseUrl';
import Cookies from 'js-cookie';
import { IoAlertCircleOutline } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

function AlertModalVenueRequest(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const location = useLocation()
    const queryParams = queryString.parse(location.search)
    const { venue_id } = queryParams
    const navigate = useNavigate()

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    console.log(props)
    const handleAcceptVenue = () => {
        const adminJwt = Cookies.get('adminjwt')
        console.log(venue_id)
        axios.post(`${BaseUrl}app_admin/accept_requested_venue`,{venue_id: venue_id}, {
            headers: {
                Authorization: `${adminJwt}`,
            }
        }
        )
            .then((response) => {
                console.log(response)
                toggleModal()
                navigate('/admin/venue_requests')
            })
            .catch((error) => {
                console.log(error)
            })
    };

    const handleDeclineVenue = () => {
        const adminJwt = Cookies.get('adminjwt')
        axios.post(`${BaseUrl}app_admin/decline_requested_venue`, {venue_id: venue_id}, {
            headers: {
                Authorization: `${adminJwt}`,
            }
        })
            .then((response) => {
                console.log(response)
                toggleModal()
                navigate('/admin/venue_requests')
            })
            .catch((error) => {
                console.log(error)
            })
    };

    return (
        <div>
            {
                props.type == 'accept' ?

                    <p onClick={toggleModal} className={`${props.active ? 'text-red-600' : ''} font-medium  hover:underline`}>
                        accept request
                    </p>
                    :
                    <p onClick={toggleModal} className={`${props.active ? 'text-red-600' : ''} font-medium  hover:underline`}>
                        decline request
                    </p>
            }

            {modalVisible && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md">
                        <div className="relative bg-white rounded-lg shadow ">
                            <button
                                onClick={toggleModal}
                                type="button"
                                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <h1>hello</h1>
                            <div className="p-4 md:p-5 text-center">
                                <div className='flex justify-center'>
                                    <IoAlertCircleOutline color='black' size={60} />
                                </div>
                                <h3 className="mb-5 text-lg font-normal text-black">
                                    Are you sure?
                                </h3>


                                {
                                    props.type == 'accept' ?
                                        <div className='flex justify-center gap-3'>
                                            < button
                                                onClick={toggleModal}
                                                type="button"
                                                className="text-gray-500 bg-red-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                            >
                                                No, cancel
                                            </button>
                                            <button
                                                onClick={handleAcceptVenue}
                                                type="button"
                                                className="text-white bg-[#4caf50] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                                            >
                                                Yes, accept 
                                            </button>
                                        </div>
                                        :
                                        <div className='flex justify-center gap-3'>
                                            < button
                                                onClick={toggleModal}
                                                type="button"
                                                className="text-gray-500 bg-red-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                            >
                                                No
                                            </button>
                                            <button
                                                onClick={handleDeclineVenue}
                                                type="button"
                                                className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                                            >
                                                Yes, cancel venue
                                            </button>
                                        </div>
                                }




                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default AlertModalVenueRequest;

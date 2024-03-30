import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl";
import { IoReorderThree } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoMdBookmarks } from "react-icons/io";
import { TiEdit } from "react-icons/ti";
import { FaUserEdit } from "react-icons/fa";

function SideBar(props) {

    const ownerVenue = useSelector(state => state.ownerTurf)
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleDrawer = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {
                ownerVenue ?
                    <>

                        {/* other device  */}
                        <div className="border h-screen hidden md:block p-3 w-[25vw] ">
                            < div className="flex flex-col items-center gap- border-b-2 py-3" >
                                <div>
                                    <img className="rounded-full object-cover h-[12vh] w-[12vh]" src={ownerVenue ? `${ImageUrl}${ownerVenue.venue.venue_images[0]['image']}` : ''} alt="" />
                                </div> 
                                <div className="flex flex-col items-center">
                                    <h1 className="font-semibold">{ownerVenue.venue.venue_name}</h1>
                                    <p className="text-sm">{ownerVenue.venue.place},{ownerVenue.venue.city}</p>
                                </div>
                            </div >
                
                            <div className="flex flex-col space-y-4 mb-5 mt-5 items-center font-semibold">
                                <div>
                                    <Link to='/owner/dashboard'><p className={props.sidebar == 'dashboard' ? 'underline' : ''}>Dashboard</p></Link>
                                </div>

                                <div>
                                    <Link to='/owner/booking_requests'><p className={props.sidebar == 'booking_requests' ? 'underline' : ''}>booking requests</p></Link>
                                </div>
                                <div>
                                    <Link to='/owner/bookings'><p className={props.sidebar == 'bookings' ? 'underline' : ''}>all bookings</p></Link>
                                </div>
                                <div>
                                    <Link to=''><p className={props.sidebar == '' ? 'underline' : ''}>edit venue</p></Link>
                                </div>
                                <div>
                                    <Link to=''><p className={props.sidebar == '' ? 'underline' : ''}>edit profile</p></Link>
                                </div>


                            </div>
                        </div >

                        {/* mobile button  */}
                        <div className="text-center">
                            <button
                                className="text-white md:hidden font-medium rounded-lg text-sm"
                                type="button"
                                onClick={toggleDrawer}
                            >
                                <IoReorderThree color="black" size={20} />
                            </button>
                        </div>

                        {/* mobile sidebar  */}
                        <div className="flex">
                            <div
                                id="drawer-navigation"
                                className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${isSidebarOpen ? '' : '-translate-x-full'
                                    } bg-white`}
                                tabIndex="-1"
                                aria-labelledby="drawer-navigation-label"
                            >
                                <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400" id="drawer-navigation-label">
                                    Menu
                                </h5>
                                <button
                                    type="button"
                                    onClick={toggleDrawer}
                                    aria-controls="drawer-navigation"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200  rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Close menu</span>
                                </button>
                                <div className="py-4 overflow-y-auto">
                                    {/* Your list items go here */}
                                    <ul class="space-y-2 font-medium">
                                        <li>
                                            <Link to='/owner/dashboard'>
                                                <div class="flex items-center p-2 text-gray-900 rounded-sm border">
                                                    <MdOutlineDashboard />
                                                    <span class="ms-3 text-md font-semibold">Dashboard</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/owner/booking_requests'>
                                                <div class="flex items-center p-2 text-gray-900 rounded-sm border">
                                                    <CiBookmarkPlus />
                                                    <span class="ms-3 text-md font-semibold">booking requests</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/owner/bookings'>
                                                <div class="flex items-center p-2 text-gray-900 rounded-sm border">
                                                    <IoMdBookmarks />
                                                    <span class="ms-3 text-md font-semibold">all bookings</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=''>
                                                <div class="flex items-center p-2 text-gray-900 rounded-sm border">
                                                    <TiEdit />
                                                    <span class="ms-3 text-md font-semibold">edit venue</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=''>
                                                <div class="flex items-center p-2 text-gray-900 rounded-sm border">
                                                    <FaUserEdit />
                                                    <span class="ms-3 text-md font-semibold">edit profile</span>
                                                </div>
                                            </Link>
                                        </li>

                                    </ul>

                                </div>

                            </div>
                        </div>

                    </>
                    : <div></div>
            }
        </>
    )
}

export default SideBar;
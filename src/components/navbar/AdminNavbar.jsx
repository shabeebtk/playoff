import React, { useState } from "react";
import playoffLogo from '../../assets/images/playoff_admin_logo.png'
import './navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";


function AdminNavbar(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const jwt = Cookies.get('adminjwt')
    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${BaseUrl}app_admin/admin_logout`, {})
            Cookies.remove('adminjwt')
            console.log('logout success')
            navigate('/admin/login')
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="bg-white border-gray-200 shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={playoffLogo} className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </div>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 "
                    aria-controls="navbar-default"
                    aria-expanded={isSidebarOpen}
                    onClick={handleToggleSidebar}
                >
                    <span className="sr-only">Toggle sidebar</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`w-full md:block md:w-auto ${isSidebarOpen ? 'block' : 'hidden'}`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
                        <li>
                            <Link to='/admin/'>
                                <p className={`block py-2 px-3 hover:bg-gray-100 text-gray-900 rounded`}>dashboard</p>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/venue_requests'>
                                <p className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 ">venue requests</p>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/users/'>
                                <p className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 ">users</p>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/venues'>
                                <p className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 ">venues</p>
                            </Link>
                        </li>
                        <li>

                            <Link />                            <button onClick={handleLogout} className="green_btn block bg-red-800">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default AdminNavbar;
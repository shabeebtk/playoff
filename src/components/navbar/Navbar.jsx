import React, { useEffect, useState } from "react";
import playoffLogo from '../../assets/images/playoff_logo.png'
import './navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { userLogout } from "../../redux/action/userAuthAction";
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import userAxiosInstance from "../../instance/axios/UserAxiosInstance";
import { getNotifications } from "../../instance/endpoints/user/userEndpoints";
import { IoIosNotifications } from "react-icons/io";
import { format } from 'date-fns'
import { IoTimeOutline } from "react-icons/io5";

function Navbar(props) {

    const isAuthenticated = useSelector(state => state.userAuth.is_authenticated)
    const user = useSelector(state => state.userAuth.user)
    const [userNotifications, setUserNotifications] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const userJwt = Cookies.get('jwt')
        if (!userJwt) {
            dispatch(userLogout(user))
        }

        userAxiosInstance.get(getNotifications)
            .then((response) => {
                console.log(response.data)
                setUserNotifications(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    const handleSeenNotification = () => {
        userAxiosInstance.post('user/seen_notification')
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);

        if (!isDropdownOpen) {
            handleSeenNotification()
        }
    };

    return (

        <div className="bg-[#F8F8F8] flex justify-between px-[3%] shadow-xl items-center py-2 md:py-4">
            <div>
                <img className="h-[25px] md:h-[40px]" src={playoffLogo} alt="" />
            </div>
            <div>
                {!user || !isAuthenticated ?
                    <div className="flex md:gap-7">
                        <Link to="/register"><button className="shadow-md font-medium rounded-sm text-sm px-2 py-1 me-2 mb-2 md:py-2.5 md:shadow-lg md:hover:bg-slate-100 md:px-5">Register</button></Link>
                        <Link to="/login"><button className="shadow-xl bg-[#4caf50] hover:bg-[#2c6b2e] text-white font-medium rounded-sm text-sm px-2 py-1 me-2 mb-2 md:py-2 md:px-5 md:shadow-lg">Login</button></Link>
                    </div>
                    :
                    <>
                        <div>
                            <div className="flex md:gap-7 gap-2 items-center">
                                <Link to='/games'>
                                    <div className={props.page == 'play' ? 'border-b-2 border-black' : ''}>
                                        <p className="font-extrabold md:text-lg text-xs">PLAY</p>
                                    </div>
                                </Link>
                                <Link to='/venues'>
                                    <div className={props.page == 'book' ? 'border-b-2 border-black' : ''}>
                                        <p className="font-extrabold md:text-lg text-xs">BOOK</p>
                                    </div>
                                </Link>

                                <div className="relative">
                                    <div className="relative mt-2">
                                        {/* Dropdown button */}
                                        <button
                                            id="dropdownHelperButton"
                                            data-dropdown-toggle="dropdownHelper"
                                            className=""
                                            type="button"
                                            onClick={handleDropdownToggle}
                                        >
                                            <IoIosNotifications className="text-lg md:text-2xl" />
                                        </button>

                                        {/* Dropdown menu */}
                                        <div
                                            id="dropdownHelper"
                                            className={`z-10 ${isDropdownOpen ? '' : 'hidden'}  md:h-[50vh] h-[40vh] shadow-lg overflow-scroll overflow-x-hidden p-2 md:w-[80vh] w-[80vw] divide-y absolute right-0 bg-slate-100 rounded-lg  `}
                                        >
                                            <div className="">
                                                <h2 className="font-semibold mb-2 text-sm md:text-lg">Notifications</h2>
                                            </div>

                                            <ul className="space-y-4 text-sm w-full">
                                                {/* notifications */}
                                                {
                                                    userNotifications.map((notification, index) => (
                                                        <li key={index} className={`border mb-2 p-2 shadow rounded-md ${!notification.seen && 'bg-white'}`}>
                                                            <div className="space-y-5 flex flex-col  w-full">
                                                                <div className="text-sm border-b w-full">
                                                                    <div className="flex justify-between mb-1">
                                                                        <div className="font-semibold text-sm">{notification.title}</div>
                                                                        <div className="font-semibold md:text-sm text-xs flex items-center"><IoTimeOutline color="green" />{format(new Date(notification.date), 'HH:mm dd-MM-yyyy')}</div>
                                                                    </div>
                                                                    <div>
                                                                        <p className="">
                                                                            {notification.body}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                }

                                            </ul>


                                        </div>
                                    </div>

                                </div>

                                <Link to='/profile'>
                                    <div className=''>
                                        {
                                            user.profile_img ? <div className="border bottom-2  rounded-full"><img style={{ objectFit: "cover" }} className="bg-cover rounded-full md:h-[30px] md:w-[30px] h-[20px] w-[20px]" src={`${ImageUrl}${user.profile_img}`} alt="no profile" /></div>
                                                :
                                                <p className="font-extrabold"><FaRegUserCircle className="text-xl" /></p>
                                        }
                                        
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </>
                }

            </div>
        </div>

    )
}

export default Navbar;
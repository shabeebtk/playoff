import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { userLogout } from "../../redux/action/userAuthAction";
import { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { GiSoccerKick } from "react-icons/gi";
import { FaRegAddressCard } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoReorderThree } from "react-icons/io5";

function UserSideBar(props) {

    const user = useSelector(state => state.userAuth.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const close = useRef(null)

    const toggleDrawer = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleOutsideClick = (event) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target)) {
            setDrawerOpen(false);
        }
    };

    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isSidebarOpen]);

    const handleLogout = async () => {
        try {
            if (user) {
                await axios.post(`${BaseUrl}user/user_logout`, { user_id: user.id })
                Cookies.remove('jwt')
                dispatch(userLogout(null))
                console.log('logout success')
                navigate('/login')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    console.log(user)
    return (

        <>
            {
                user ?
                    <>

                        {/* other device  */}
                        <div className="border h-screen hidden md:block p-3 w-[25vw] ">
                            < div className="flex flex-col items-center gap- border-b-2 py-3" >
                                <div>
                                    {
                                        user.profile_img ?
                                            <img className="rounded-full object-cover h-[12vh] w-[12vh]" src={`${ImageUrl}${user.profile_img}`} alt="" />
                                            :
                                            <img style={{ objectFit: "cover" }} className="h-[80px] w-[80px] rounded-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUvSN8kFRl3ADkH6SYy3c3utUKrdNH5Z-Ew&usqp=CAU' alt="" />

                                    }
                                </div>
                                <div className="flex flex-col items-center">
                                    <h1 className="font-semibold">{user.player_username}</h1>
                                    <p className="text-sm">{user.email}</p>
                                </div>
                            </div >

                            <div className="flex flex-col space-y-4 mb-5 mt-5 items-center font-semibold">
                                <div>
                                    <Link to='/profile'><p className={props.sidebar == 'dashboard' ? 'underline' : ''}>player profile</p></Link>
                                </div>

                                <div>
                                    <Link to='/bookings'><p className={props.sidebar == 'bookings' ? 'underline' : ''}>venue bookings</p></Link>
                                </div>
                                <div>
                                    <Link to='/profile/your_games'><p className={props.sidebar == 'player_games' ? 'underline' : ''}>player games</p></Link>
                                </div>
                                <div>
                                    <Link to='/personal/details'><p className={props.sidebar == 'personal' ? 'underline' : ''}>personal details</p></Link>
                                </div>

                                <div className="text-red-500 cursor-pointer" onClick={handleLogout}>
                                    logout
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
                                            <Link to='/profile'>
                                                <div class="flex items-center p-2 text-gray-900 rounded-sm border">
                                                    <FaRegUserCircle />
                                                    <span class="ms-3 text-md font-semibold">player profile</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/bookings'>
                                                <div class="flex items-center p-2 text-gray-900 rounded-sm border">
                                                    <CiBookmark />
                                                    <span class="ms-3 text-md font-semibold">venue bookings</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/profile/your_games'>
                                                <div class="flex items-center p-2 text-gray-900 rounded-sm border">
                                                    <GiSoccerKick />
                                                    <span class="ms-3 text-md font-semibold">player games</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/personal/details'>
                                                <div class="flex items-center p-2 text-gray-900 rounded-sm border">
                                                    <FaRegAddressCard />
                                                    <span class="ms-3 text-md font-semibold">personal details</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <div onClick={handleLogout} class="flex cursor-pointer items-center p-2 text-gray-900 rounded-sm border">
                                                <RiLogoutBoxFill />
                                                <span class="ms-3 text-md font-semibold">Logout</span>
                                            </div>
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

export default UserSideBar;
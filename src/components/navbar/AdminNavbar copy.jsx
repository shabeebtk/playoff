import React from "react";
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
    const jwt = Cookies.get('adminjwt')


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
        <div className="bg-[#F8F8F8] flex justify-between px-[3%] mb-6 shadow-xl items-center h-[80px]">
            <div>
                <img className="h-[40px]" src={playoffLogo} alt="" />
            </div>
            <div className="flex items-center">
                    <div className="flex gap-7 items-center">
                        <Link to="/admin/">
                            <div className={props.page == 'dashboard' ? 'border-b-2 border-black' : ''}>
                                <p className="font-extrabold">dashboard</p>
                            </div>
                        </Link>
                        <Link to="/admin/venue_requests">
                            <div className={props.page == 'venue_requests' ? 'border-b-2 border-black' : ''}>
                                <p className="font-extrabold">venue requests</p>
                            </div>
                        </Link>
                        <Link to="/admin/users/">
                            <div className={props.page == 'users' ? 'border-b-2 border-black' : ''}>
                                <p className="font-extrabold">users</p>
                            </div>
                        </Link>
                        <Link to='/admin/venues'>
                            <div className={props.page == 'venues' ? 'border-b-2 border-black' : ''}>
                                <p className="font-extrabold">venues</p>
                            </div>
                        </Link>
                        
                        <div>
                        <button onClick={handleLogout} className="green_btn bg-red-800">Logout</button>
                        </div>
                    </div>                
            </div>
        </div>

    )
}

export default AdminNavbar;
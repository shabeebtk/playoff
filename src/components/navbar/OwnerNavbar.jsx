import React, { useEffect } from "react";
import playoff_owner_logo from '../../assets/images/playoff_owner_logo.png'
import './navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { ownerLogout } from "../../redux/action/onwerAuthAction";

function OwnerNavbar(props) {

    const isAuthenticated = useSelector(state => state.ownerAuth.is_authenticated)
    const owner = useSelector(state => state.ownerAuth.owner)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async ()=>{
        if (isAuthenticated){
            try{
                await axios.post(`${BaseUrl}owner/logout`)
                Cookies.remove('adminjwt')
                dispatch(ownerLogout(owner))
                console.log('logout success')
                navigate('/owner/login')
            }
            catch(error){
                console.log(error)
            }
        }
    }

    return (

        <div className="bg-[#F8F8F8] flex justify-between px-[3%] shadow-xl items-center py-2 md:py-4">
            <div>
                <img className="h-[30px] md:h-[40px]" src={playoff_owner_logo} alt="" />
            </div>
            <div>
                {   
                    !isAuthenticated || !owner ?
                    <div className="flex md:gap-7">
                        <Link to="/owner/register"><button className="shadow-md font-medium rounded-sm text-sm px-2 py-1 me-2 mb-2 md:py-2.5 md:shadow-lg md:hover:bg-slate-100 md:px-5">Register</button></Link>
                        <Link to="/owner/login"><button className="shadow-xl bg-[#4caf50] hover:bg-[#2c6b2e] text-white font-medium rounded-sm text-sm px-2 py-1 me-2 mb-2 md:py-2 md:px-5 md:shadow-lg">Login</button></Link>
                    </div>
                    : 
                    <div className=''>
                        <button onClick={ handleLogout } className="font-bold bg-red-600 shadow-md text-xs text-white rounded-sm md:text-sm px-2 py-1 me-2 mb-2 md:py-2.5 md:shadow-lg md:px-5">logout</button>
                    </div>
                    
                }
                    
            </div>
        </div>

    )
}

export default OwnerNavbar;
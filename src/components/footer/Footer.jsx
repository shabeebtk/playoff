import React, { useCallback, useState } from "react";
import playoffLogo from '../../assets/images/playoff_logo.png'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { FaFacebook,FaInstagram } from "react-icons/fa";
import { backgoundImage } from "../../constant_data/BackgroundImage";

function Footer(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div style={backgoundImage} className="md:flex md:justify-between px-[3%] md:items-center py-[3%]">
            <div className="flex justify-center">
                <img className="h-[25px] md:h-[40px]" src={playoffLogo} alt="" />
            </div>
            <div className="flex justify-center mt-3 md:mt-0">
                    <div className="md:flex flex-row justify-center items-center gap-7 ">
                        <Link to="/admin/">
                            <div className='flex justify-center'>
                                <p className="font-extrabold text-sm">about us</p>
                            </div>
                        </Link>
                        <Link >
                            <div className='flex justify-center'>
                                <p className="font-extrabold text-sm">contact</p>
                            </div>
                        </Link>
                        <Link to="/admin/users/">
                            <div className='flex justify-center'>
                                <p className="font-extrabold text-sm">report a problem</p>
                            </div>
                        </Link>
                        <Link to="/owner/">
                            <div className='flex justify-center'>
                                <p className="font-extrabold text-sm">partner with us</p>
                            </div>
                        </Link>
                        <div className="flex justify-center mt-2 gap-4">
                            <FaFacebook size={20} />
                            <FaInstagram size={20} />
                        </div>
                        
                    </div>                
            </div>
        </div>

    )
}

export default Footer;
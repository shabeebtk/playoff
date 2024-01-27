import React, { useEffect, useState } from "react";
import playoffLogo from '../../assets/images/playoff_admin_logo.png'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from 'js-cookie'
import ButtonLoader from "../loader/ButtonLoader";


function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(false)
    const [btnLoader, setBtnLoader] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        if (email && password) {
            setErrorMessage(false)
            try {
                setBtnLoader(true)
                const response = await axios.post(`${BaseUrl}app_admin/login`, {
                    email : email,
                    password : password
                })

                if (response.status == 200){
                    const { adminjwt, message } = response.data
                    Cookies.set('adminjwt', adminjwt);
                    console.log('login success')
                    setBtnLoader(false)
                    navigate('/admin/')
                    
                }else{
                    setErrorMessage('login failed')
                    setBtnLoader(false)
                }
            }
            catch (error) {
                setErrorMessage('login failed')
                setBtnLoader(false)
            }
        }
    }

    
    return (
        <div className="bg-gray-50 pt-3">
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 ">
                <div>
                    <img src={playoffLogo} className="h-[40px]" alt="" />
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                <p className="text-center text-red-900 text-sm mb-2">{errorMessage ? errorMessage : ''}</p>

                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="register_label"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    className="block w-full mt-1 py-2 pl-2 rounded-md shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="register_label undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    className="block w-full mt-1 py-2 pl-2 rounded-md shadow-sm"
                                />
                            </div>
                        </div>

                        <a
                            href="#"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="flex items-center mt-4">
                        {
                            !btnLoader ?

                                <button onClick={handleLogin} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#4caf50] rounded-sm">
                                    Login
                                </button>
                                :
                                <button className="w-full flex justify-center px-4 py-4 tracking-wide text-white transition-colors duration-200 transform bg-[#4caf50] rounded-sm">
                                    <ButtonLoader />
                                </button>
                        }
                        </div>
                    <div className="mt-4 text-grey-600 text-center">
                        <p>Don't have an account? <Link to="/owner/register"><span className="text-purple-600 hover:underline">Register</span></Link></p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}


export default AdminLogin;
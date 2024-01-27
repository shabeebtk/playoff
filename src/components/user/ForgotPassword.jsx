import React, { useEffect, useState } from "react";
import playoffLogo from '../../assets/images/playoff_logo.png'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from 'js-cookie'
import ButtonLoader from "../loader/ButtonLoader";
import BouncingDots from "../loader/BouncingDots";

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [otp, setOTP] = useState('')

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(false)
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.userAuth.is_authenticated)
    const user = useSelector(state => state.userAuth.user)
    const [btnLoader, setBtnLoader] = useState(false)
    const [OtpLoader, setOtpLoader] = useState(false)
    const [recieveotp, setRecieveotp] = useState(null)

    useEffect(()=>{
        if (user && isAuthenticated){
            navigate('/venues')
        }
    })

    const sendOTP = async ()=>{
        if (email){
            setErrorMessage(false)
            setOtpLoader(true)
            await axios.post(`${BaseUrl}user/sent_otp`, {
                email : email
            })
            .then((response)=>{
                console.log(response)
                recieveotp('sent')
                setOtpLoader(false)
            })
            .catch((error)=>{
                console.log(error)
                setOtpLoader(false)
                setErrorMessage(error.response.data.error)
            })
        }
    }
    
    const handleChangePassword = async (e) => {
        e.preventDefault()
        if (email && otp && password && password == confirmPassword) {
            try {
                setBtnLoader(true)
                setErrorMessage(false)
                await axios.post(`${BaseUrl}user/change_password`, {
                    email : email,
                    otp : otp,
                    new_password : password
                })
                .then((response)=>{
                    console.log(response)
                    setBtnLoader(false)
                    navigate('/login')
                })
                .catch((error)=>{
                    console.log(error)
                    setErrorMessage(error.response.data.error)
                    setBtnLoader(false)
                })
                
            }
            catch (error) {
                console.log(error)
                setErrorMessage(error.response.data.error)
                setBtnLoader(false)
            }
        }
    }

    return (

        <div className="bg-gray-50 pt-3">
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 ">
                <div>
                    <Link to="/">
                        <img src={playoffLogo} className="h-[40px]" alt="" />
                    </Link>
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
                                htmlFor="email"
                                className="register_label"
                            >
                                OTP
                            </label>
                            <div className="flex gap-3 h-11">
                                <input
                                    onChange={(e) => setOTP(e.target.value)}
                                    type="email"
                                    name="email"
                                    className="block w-[80%] mt-1 py-2 pl-2 rounded-md shadow-sm"
                                />
                                {
                                    !OtpLoader ?
                                    <button onClick={sendOTP} className="green_btn w-[20%] text-xs px-2 h-11">send OTP</button>
                                    :
                                    <button onClick={sendOTP} className="green_btn w-[20%] text-xs px-2 h-11">
                                        <BouncingDots/>
                                    </button>
                                }
                            </div>
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="register_label undefined"
                            >
                                new Password
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
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="register_label undefined"
                            >
                                confirm new Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    onChange={(e) => setconfirmPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    className="block w-full mt-1 py-2 pl-2 rounded-md shadow-sm"
                                />
                            </div>
                        </div>

                       
                        <div className="flex items-center mt-4">
                            {
                                !btnLoader ? 
                            
                            <button onClick={handleChangePassword} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#4caf50] rounded-sm">
                                change password
                            </button>
                            :
                            <button className="w-full flex justify-center px-4 py-4 tracking-wide text-white transition-colors duration-200 transform bg-[#4caf50] rounded-sm">
                                <ButtonLoader/>
                            </button>
                            }
                        </div>
                </div>
            </div>
        </div>
    );
}


export default ForgotPassword;
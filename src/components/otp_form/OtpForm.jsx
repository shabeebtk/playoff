import React, { useEffect, useState } from "react";
import playoffLogo from '../../assets/images/playoff_logo.png'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from 'js-cookie'
const successNotification = (message) => toast.success(message);

function OtpForm() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('')
    const user = useSelector(state => state.userAuth.user)
    const successNotification = (message) => toast.success(message);

    const handleOtpConfirmation = async (e) => {
        if (user.email && otp) {
            e.preventDefault()
            await axios.post(`${BaseUrl}user/verify_email`, {
                email: user.email,
                email_otp: otp
            })
                .then((response) => {
                    console.log('email verified', response)
                    successNotification('email verified please login')
                    navigate('/login')
                })
                .catch((error) => {
                    setErrorMessage(error.response.data.error)
                })
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

                    <p className="text-center mb-2">OTP has sent to your <span className="text-green-800">{user ? user.email : ''}</span></p>
                    <div className="mt-4">
                        <label
                            htmlFor="email"
                            className="register_label"
                        >
                            enter otp
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                onChange={(e) => setOtp(e.target.value)}
                                type="email"
                                name="email"
                                className="block w-full mt-1 py-2 pl-2 rounded-md shadow-sm"
                            />
                        </div>
                    </div>

                    <div
                        className="text-xs text-purple-600 hover:underline mt-2 flex justify-end"
                    >
                        resend password
                    </div>
                    <div className="flex items-center mt-4">
                        <button onClick={handleOtpConfirmation} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#4caf50] rounded-sm">
                            verify and login
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}


export default OtpForm;
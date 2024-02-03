import React, { useEffect, useState } from "react";
import playoffLogo from '../../assets/images/playoff_logo.png'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import toast from "react-hot-toast";
import ButtonLoader from "../loader/ButtonLoader";

function OtpForm() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('')
    const user = useSelector(state => state.userAuth.user)
    const successNotification = (message) => toast.success(message);
    const [userEmail, setEmail] = useState(user ? user.email : '')
    const [btnLoader, setBtnLoader] = useState(false)
    const [otpBtnLoader, setOtpBtnLoader] = useState(false)
    const [otpSend, setOtpSend] = useState(false)
    const errorNotification = (message) => toast.error(message);

    const handleOtpConfirmation = async (e) => {
        if (userEmail && otp) {
            setBtnLoader(true)
            e.preventDefault()
            await axios.post(`${BaseUrl}user/verify_email`, {
                email: userEmail,
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
                .finally(()=>{
                    setBtnLoader(false)
                })
        }
    }

    const sentOtp = () => {
        if (!userEmail || otpSend){
            return
        }
        setOtpBtnLoader(true)
        axios.post(`${BaseUrl}user/send_email_otp`, {
            email : userEmail
        })
        .then((response)=>{
            console.log(response)
            successNotification('otp sent')
            setOtpSend(true)
        })
        .catch((error) => {
            console.log(error.response)
            if (error.response.status == 409){
                successNotification('email already verified')
                navigate('/login')
                return
            }
            if (error.response.status == 401){
                errorNotification('email not registered')
                navigate('/register')
                return
            }
            errorNotification('failed to send otp')
        })
        .finally(() => {
            setOtpBtnLoader(false)
        })
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

                    {user && <p className="text-center mb-2">OTP has sent to your <span className="text-green-800">{user ? user.email : ''}</span></p>}
                    {
                        !user &&
                        <div className="mt-4 flex gap-1 items-center" >
                            <div className="w-full">
                                <label
                                    htmlFor="email"
                                    className="register_label"
                                >
                                    enter email
                                </label>
                                <div className="flex flex-col items-start">
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        name="email"
                                        className="block w-full mt-1 py-2 pl-2 border rounded-md shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="w-[30%]">
                                {
                                    otpBtnLoader ? <button className='green_btn px-10 mt-8 py-4 shadow-none'><ButtonLoader /></button>
                                        :
                                        <button onClick={sentOtp} className='green_btn shadow-none mt-8'>sent otp</button>
                                }
                            </div>

                        </div>
                    }

                    <div className="mt-4">
                        <label
                            htmlFor="otp"
                            className="register_label"
                        >
                            enter otp
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                onChange={(e) => setOtp(e.target.value)}
                                type="text"
                                name="otp"
                                className="block w-full mt-1 py-2 pl-2 rounded-md shadow-sm border"
                            />
                        </div>
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
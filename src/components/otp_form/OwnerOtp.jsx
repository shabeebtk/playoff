import React, { useEffect, useState } from "react";
import playoffLogo from '../../assets/images/playoff_owner_logo.png'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import { ownerEmailVerified } from "../../redux/action/onwerAuthAction";

function OnwerOtp() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('')
    const owner = useSelector(state => state.ownerAuth.owner)

    console.log(owner.owner_email)
    const handleOtpConfirmation = async (e) => {
        if (owner.owner_email && otp) {
            e.preventDefault()
            await axios.post(`${BaseUrl}owner/verify_owner_email`, {
                owner_email: owner.owner_email,
                email_otp: otp
            })
                .then((response) => {
                    console.log('email verified', response)
                    console.log(response.data)
                    dispatch(ownerEmailVerified(response.data))
                    navigate('/owner/login')
                })
                .catch((error) => {
                    setErrorMessage(error.response.data.error)
                })
        }else{
            console.log('not working')
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

                    <p className="text-center mb-2">OTP has sent to your <span className="text-green-800">{owner ? owner.email : ''}</span></p>
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


export default OnwerOtp;
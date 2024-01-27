import React, { useEffect, useState } from "react";
import playoffLogo from '../../assets/images/playoff_owner_logo.png'
import { Link } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ownerRegister } from "../../redux/action/onwerAuthAction";
import ButtonLoader from "../loader/ButtonLoader";

function OwnerRegister() {

    const [error, setError] = useState(null)
    const [ownerName, setOwnerName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [btnLoader, setBtnLoader] = useState(false)

    const handleSubmit = async (e) => {
        if (ownerName && email && phone && password && confirmPassword) {
            if (password != confirmPassword) {
                setError('confirm password not matching')
                return
            }
            console.log(ownerName, email, phone, password, confirmPassword)
            e.preventDefault()
            setBtnLoader(true)
            setError(null)
            await axios.post(`${BaseUrl}owner/register`, {
                owner_name : ownerName,
                owner_email : email,
                owner_phone : phone,
                owner_password : password,
            })
                .then((response) => {
                    dispatch(ownerRegister(response.data))
                    setBtnLoader(false)
                    navigate('/owner/verify_email')
                })
                .catch((error) => {
                    setError(error.response.data.error)
                    setBtnLoader(false)
                })
        }
    }

    return (
        <div className="bg-gray-50 pt-3">
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 ">
                <div>
                    <Link to="/owner">
                        <img src={playoffLogo} className="h-[40px]" alt="" />
                    </Link>
                </div>

                {/* <div className="absolute right-10 top-10 ">
                    <AlertBox heading='Register success' />
                </div> */}

                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <p className="text-center text-red-900 text-sm mb-2">{error ? error : ''}</p>
                    <div>
                        <label
                            htmlFor="name"
                            className="register_label"
                        >
                            owner name
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                onChange={(e) => setOwnerName(e.target.value)}
                                type="text"
                                name="name"
                                className="block w-full mt-1 py-2 pl-2 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
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
                            phone
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                onChange={(e) => setPhone(e.target.value)}
                                type="number"
                                name="phone"
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
                    <div className="mt-4">
                        <label
                            htmlFor="password_confirmation"
                            className="register_label"
                        >
                            Confirm Password
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                onChange={(e) => setconfirmPassword(e.target.value)}
                                type="password"
                                name="password_confirmation"
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

                                <button onClick={handleSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#4caf50] rounded-sm">
                                    Register
                                </button>
                                :
                                <button className="w-full flex justify-center px-4 py-4 tracking-wide text-white transition-colors duration-200 transform bg-[#4caf50] rounded-sm">
                                    <ButtonLoader />
                                </button>
                        }
                    </div>
                    <div className="mt-4 text-grey-600 text-center">
                        <p>Don't have an account? <Link to="/owner/login"><span className="text-purple-600 hover:underline">login</span></Link></p>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
}


export default OwnerRegister
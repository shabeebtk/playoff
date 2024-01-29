import React, { useEffect, useState } from "react";
import playoffLogo from '../../assets/images/playoff_logo.png'
import { Link } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import AlertBox from "../alert_box/AlertBox";
import { useDispatch } from "react-redux";
import { userRegister } from "../../redux/action/userAuthAction";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../loader/ButtonLoader";
import toast, { Toaster } from 'react-hot-toast';
import { backgoundImage } from "../../constant_data/BackgroundImage";

function Register() {

    const [error, setError] = useState(null)
    const [player_username, setPlayerUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [btnLoader, setBtnLoader] = useState(false)
    const successNotification = (message) => toast.success(message);

    const handleSubmit = async (e) => {
        setError('')
        if (player_username && email && phone && password.length > 4 && confirmPassword) {
            if (password != confirmPassword) {
                setError('confirm password not matching')
                return
            }

            e.preventDefault()
            setBtnLoader(true)
            setError(null)
            await axios.post(`${BaseUrl}user/register`, {
                player_username,
                email,
                phone,
                password,
            })
                .then((response) => {
                    dispatch(userRegister(response.data))
                    setBtnLoader(false)
                    successNotification('regsitered please confirm email')
                    navigate('/confirm_email')
                })
                .catch((error) => {
                    setBtnLoader(false)
                    setError(error.response.data.error)
                })
        } else {
            setError('please fill the form')
        }
    }

    const ValidateEmail = (email)=> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        
        if (!isValidEmail){
            setError('email not valid')
        }else{
            setError(null)
        }
    }

    const validatePhone = (phone)=>{
        const phoneRegex = /^(?:(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9})$/
        const isValidPhone = phoneRegex.test(phone)

        if (!isValidPhone){
            setError('phone not valid')
        }

        else{
            setError(null)
        }
    }

    return (
        <div style={backgoundImage} className="bg-gray-50 pt-3 px-[2%]">
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 ">
                <div>
                    <Link to="/">
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
                            username
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                onChange={(e) => setPlayerUsername(e.target.value)}
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
                                onBlur={(e)=> ValidateEmail(e.target.value)}
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
                                onBlur={(e) => validatePhone(e.target.value)}
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
                        <p>Don't have an account? <Link to="/login"><span className="text-purple-600 hover:underline">login</span></Link></p>
                    </div>
                    <div className="flex items-center w-full my-4">
                        <hr className="w-full" />
                        <p className="px-3 ">OR</p>
                        <hr className="w-full" />
                    </div>
                    <div className="my-6 space-y-2">
                        <button
                            aria-label="Login with Google"
                            type="button"
                            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p>Login with Google</p>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}


export default Register
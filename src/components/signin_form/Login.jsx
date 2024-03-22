import React, { useEffect, useState } from "react";
import playoffLogo from '../../assets/images/playoff_logo.png'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/action/userAuthAction";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from 'js-cookie'
import ButtonLoader from "../loader/ButtonLoader";
import toast, { Toaster } from 'react-hot-toast';
import { backgoundImage } from "../../constant_data/BackgroundImage";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(false)
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.userAuth.is_authenticated)
    const user = useSelector(state => state.userAuth.user)
    const [btnLoader, setBtnLoader] = useState(false)
    const successNotification = (message) => toast.success(message);
    const errorNotification = (message) => toast.error(message);

    useEffect(() => {
        if (user && isAuthenticated) {
            navigate('/venues')
        }
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        if (email && password) {
            try {
                setBtnLoader(true)
                setErrorMessage(false)
                const response = await axios.post(`${BaseUrl}user/login`, {
                    email,
                    password
                })
                console.log(response)
                if (response.status == 200) {
                    const { jwt, message } = response.data
                    Cookies.set('jwt', jwt);

                    await axios.get(`${BaseUrl}user/get_user`, {
                        headers: {
                            Authorization: `${jwt}`
                        }
                    })
                        .then(response => {
                            console.log(response.data)
                            if (response.data.verified == false){
                                errorNotification('please verify your email')
                                navigate('/confirm_email')
                                return
                            }
                            dispatch(userLogin(response.data))
                            setBtnLoader(false)
                            successNotification('login success')
                            navigate('/venues')
                        })
                        .catch(error => {
                            console.log(error)
                            setBtnLoader(false)
                        })
                } else {
                    console.log('cant get user')
                    setBtnLoader(false)
                }

            }
            catch (error) {
                console.log(error)
                setErrorMessage(error.response.data.error)
                setBtnLoader(false)
            }
        }
    }

    const responseGoogle = (response) => {
        console.log(response);
      }

    return (
        <div style={backgoundImage} className="bg-gray-50 md:pt-3 pt-20 px-[2%]">
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

                    <Link
                        to='/forgot_password'
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forgot Password?
                    </Link>
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
                        <p>Don't have an account? <Link to="/register"><span className="text-purple-600 hover:underline">Register</span></Link></p>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
}


export default Login
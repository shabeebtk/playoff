import React, { useEffect, useState } from "react";
import playoffLogo from '../../assets/images/playoff_owner_logo.png'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from 'js-cookie'
import { ownerLogin } from "../../redux/action/onwerAuthAction";
import ButtonLoader from "../loader/ButtonLoader";
import toast, { Toaster } from 'react-hot-toast';

function OwnerLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(false)
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.ownerAuth.is_authenticated)
    const owner = useSelector(state => state.ownerAuth.owner)
    const [btnLoader, setBtnLoader] = useState(false)
    const successNotification = (message) => toast.success(message);

    useEffect(() => {
        const ownerJwt = Cookies.get('ownerJwt')

        if (owner != null && isAuthenticated && ownerJwt) {
            navigate('/owner/dashboard')
        }
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        if (email && password) {
            setErrorMessage(false)
            try {
                setBtnLoader(true)
                const response = await axios.post(`${BaseUrl}owner/login`, {
                    owner_email: email,
                    owner_password: password
                })
                console.log('response')
                if (response.status == 200) {
                    const { ownerjwt, message } = response.data
                    console.log(ownerjwt)
                    Cookies.set('ownerJwt', ownerjwt);

                    await axios.get(`${BaseUrl}owner/get_owner`, {
                        headers: {
                            Authorization: `${ownerjwt}`
                        }
                    })
                        .then(response => {
                            console.log(response.data)
                            dispatch(ownerLogin(response.data))
                            setBtnLoader(false)
                            successNotification('login success')
                            navigate('/owner/dashboard')
                        })
                        .catch(error => {
                            console.log(error)
                            setBtnLoader(false)
                        })
                } else {
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
                    <Link to="/owner/">
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


export default OwnerLogin;
import axios from 'axios';
import React, { useState } from 'react';
import { BaseUrl } from '../../constant/BaseUrl';
import Cookies from 'js-cookie';
import userAxiosInstance from '../../instance/axios/UserAxiosInstance';
import { ChangeEmail, sentOtpChangeEmail } from '../../instance/endpoints/user/userEndpoints';
import toast, { Toaster } from 'react-hot-toast';
import ButtonLoader from '../loader/ButtonLoader';
import { useDispatch } from 'react-redux';
import { userUpdate } from '../../redux/action/userAuthAction';

function ChangeEmailModal(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [newEmail, setNewEmail] = useState('')
    const [otp, setOtp] = useState('')
    const successNotification = (message) => toast.success(message);
    const errorNotification = (message) => toast.error(message);
    const [otpBtnLoader, setOtpBtnLoader] = useState(false)
    const [btnLoader, setBtnLoader] = useState(false)
    const [otpSend, setOtpSend] = useState(false)
    const dispatch = useDispatch()

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const sentOtp = () => {
        if (newEmail) {
            setOtpBtnLoader(true)
            userAxiosInstance.post(sentOtpChangeEmail, {
                new_email: newEmail
            })
                .then((response) => {
                    console.log(response)
                    successNotification('otp sent')
                    setOtpSend(true)
                })
                .catch((error) => {
                    console.log(error)
                    if (error.response.status == 409) {
                        errorNotification('email already exist')
                    }else{
                        errorNotification('failed to send otp')
                    }
                })
                .finally(()=>{
                    setOtpBtnLoader(false)
                })
        }else{
            errorNotification('enter email')
        }
    }

    const handleChangeEmail = () => {
        if (newEmail && otp) {
            setBtnLoader(true)
            userAxiosInstance.post(ChangeEmail, {
                new_email: newEmail,
                otp: otp
            })
                .then((response) => {
                    console.log(response)
                    successNotification('email changed successfully')
                    console.log(response.data)
                    dispatch(userUpdate(response.data))
                    toggleModal()           
                    props.update()
                })
                .catch((error) => {
                    console.log(error)
                    if (error.response.status == 401) {
                        errorNotification('incorrect otp')
                    }
                }).finally(()=>{
                    setBtnLoader(false)
                })
        }
        else{
            errorNotification('fill the blanks')
        }
    }

    return (
        <div>
            <dir>
                <p onClick={toggleModal} className='hover:underline text-blue-500 cursor-pointer'>
                    change email
                </p>
            </dir>

            {modalVisible && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen backdrop-blur-sm bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md bg-[#F8F8F8] rounded-md">
                        <div className='flex justify-between pr-3'>
                            <h1 className='text-lg font-semibold'>change email</h1>
                            <button onClick={toggleModal} className='font-semibold'>x</button>
                        </div>
                        <div className="relative bg-white rounded-lg shadow ">
                            <button
                                onClick={toggleModal}
                                type="button"
                                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >

                                <span className="sr-only">Close modal</span>
                            </button>


                            <div className="p-4 md:p-5 text-center ">
                                <div className='mb-3'>
                                    <label className='flex items-start font-semibold' htmlFor="">new email</label>
                                    <input onChange={(e) => setNewEmail(e.target.value)} type="email" className='w-full border py-2 px-2' placeholder='enter here' />
                                </div>

                                <div className='flex justify-between items-center'>
                                    <div className='w-[70%]'>
                                        <label className='flex items-start font-semibold' htmlFor="">OTP</label>
                                        <input onChange={(e) => setOtp(e.target.value)} type="email" className='w-full border py-2 px-2' placeholder='enter here' />
                                    </div>
                                    <div>
                                        {
                                        otpBtnLoader ? <button className='green_btn px-10 mt-8 py-4 shadow-none'><ButtonLoader/></button>
                                        : 
                                        <button onClick={sentOtp} className='green_btn shadow-none mt-8'>sent otp</button>
                                    }
                                    </div>
                                </div>

                                <div className='mt-8 flex gap-5 justify-center'>
                                    {
                                        btnLoader ? <button className='green_btn px-16 py-4 shadow-none'><ButtonLoader/></button>
                                        : 
                                        <button onClick={handleChangeEmail} className='green_btn shadow-none'>change email</button>
                                    }
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangeEmailModal;

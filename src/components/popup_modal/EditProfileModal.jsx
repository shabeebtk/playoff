import axios from 'axios';
import React, { useState } from 'react';
import { BaseUrl, ImageUrl } from '../../constant/BaseUrl';
import Cookies from 'js-cookie';
import userAxiosInstance from '../../instance/axios/UserAxiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import ButtonLoader from '../loader/ButtonLoader';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdate } from '../../redux/action/userAuthAction';
import { MdEditSquare } from 'react-icons/md';
import { checkUsername, changeUserProfile } from '../../instance/endpoints/user/userEndpoints';
import {debounce} from 'lodash'

function EditProfileModal(props) {

    const user = useSelector(state => state.userAuth.user)
    const [modalVisible, setModalVisible] = useState(false);
    const [profileImage, setprofileImage] = useState(null)
    const [image, setImage] = useState(null)
    const [username, setUsername] = useState(props.username)
    const [usernameError, setUserNameError] = useState(null)
    const [skill, setSkill] = useState(user.skill_level)
    const successNotification = (message) => toast.success(message);
    const errorNotification = (message) => toast.error(message);
    const [btnLoader, setBtnLoader] = useState(false)
    const dispatch = useDispatch()

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setImage(file)

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setprofileImage(reader.result)
            }
            reader.readAsDataURL(file);
        }
    }

    const makeRequestDelay = debounce((username)=>{
        userAxiosInstance.post(checkUsername, {
            username: username
        })
            .then((response) => {
                console.log(response)
                setUserNameError(null)
            })
            .catch((error) => {
                if (error.response.status == 409){
                    setUserNameError('username already exists')
                }
            })
    }, 500)

    const handleUsername = (e) => {
        setUsername(e.target.value)
        if (username.length < 3){
            console.log('working')
            setUserNameError('username too short')
            return
        } 
        console.log('working erq')
        makeRequestDelay(e.target.value)
    }

    console.log(image)

    const handleEditProfile = () => {
        if (!usernameError) {
            setBtnLoader(true)
            const formData = new FormData();
            if (image){
                formData.append('file', image);
            }
            formData.append('username', username)
            formData.append('skill', skill)

            userAxiosInstance.post(changeUserProfile, formData, {
                headers : {
                    "Content-Type" : 'multipart/form-data',
                }
            })
                .then((response) => {
                    console.log(response)
                    successNotification('profile updated successfully')
                    console.log(response.data)
                    dispatch(userUpdate(response.data))
                    toggleModal()
                    props.update()
                })
                .catch((error) => {
                    console.log('working')
                }).finally(() => {
                    setBtnLoader(false)
                })
        }
        else {
            errorNotification("can't use this username")
        }
    }

    return (
        <div>
            <dir>
                <p onClick={toggleModal} className="flex cursor-pointer items-center font-bold gap-1"><MdEditSquare color="brown" />edit</p>
            </dir>

            {modalVisible && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen backdrop-blur-sm bg-black bg-opacity-50">
                    <div className="relative p-4 md:w-full w-[95%] max-w-md bg-[#F8F8F8] rounded-md">
                        <div className='flex justify-between pr-3'>
                            <h1 className='text-lg font-semibold'>edit profile</h1>
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
                                    <label className="relative inline-flex items-center">
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e)}
                                        />
                                        {
                                            profileImage ?
                                                <div style={{ backgroundImage: `url(${profileImage})`, backgroundSize:'cover' }} className="border-3 rounded-full w-[150px] h-[150px] border text-center">
                                                    <div className=' w-[150px] h-[150px] cursor-pointer rounded-full backdrop-blur-sm opacity-0 hover:opacity-100 flex justify-center items-center'>
                                                        <p className="text-white text-sm">Change Profile</p>
                                                    </div>
                                                </div>
                                                : user.profile_img ?
                                                    <div style={{ backgroundImage: `url(${ImageUrl}${user.profile_img})`, backgroundSize:'cover', backgroundRepeat:'no-repeat' }} className="border-3 rounded-full  w-[150px] h-[150px] border text-center">
                                                        <div className=' w-[150px] h-[150px] cursor-pointer rounded-full backdrop-blur-sm opacity-0 hover:opacity-100 flex justify-center items-center'>
                                                            <p className="text-white text-sm">Change Profile</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUvSN8kFRl3ADkH6SYy3c3utUKrdNH5Z-Ew&usqp=CAU')`, backgroundSize:'cover' }} className="border-3 rounded-full  w-[150px] h-[150px] border text-center">
                                                        <div className=' w-[150px] h-[150px] cursor-pointer rounded-full backdrop-blur-sm opacity-0 hover:opacity-100 flex justify-center items-center'>
                                                            <p className="text-white text-sm">Change Profile</p>
                                                        </div>
                                                    </div>
                                        }
                                    </label>
                                </div>


                                <div className=''>
                                    <label className='flex items-start font-semibold' htmlFor="">username</label>
                                    <input type="email" onChange={(e) => handleUsername(e)} value={username} className='w-full outline-none border py-2 px-2' placeholder='enter here' />
                                    {usernameError && <p className='text-sm text-red-500'>username already exists</p>}
                                </div>

                                <div className=''>
                                    <label className='flex items-start font-semibold mt-4' htmlFor="">game skill</label>

                                    <div className="flex rounded-md shadow-sm mt-3 overflow-x-scroll" role="group">
                                        <button type="button" onClick={(e) => setSkill(e.target.value)} value={`beginner`} className={`px-4 py-2 text-sm font-medium text-gray-900 ${skill == 'beginner' ? 'bg-[#4caf50]  text-white' : 'bg-white'} border`}>
                                            beginner
                                        </button>
                                        <button type="button" onClick={(e) => setSkill(e.target.value)} value={`amateur`} className={`px-4 py-2 text-sm font-medium text-gray-900 ${skill == 'amateur' ? 'bg-[#4caf50] text-white' : 'bg-white'} border border-gray-200 `}>
                                            amateur
                                        </button>
                                        <button type="button" onClick={(e) => setSkill(e.target.value)} value={`intermediate`} className={`px-4 py-2 text-sm font-medium text-gray-900 ${skill == 'intermediate' ? 'bg-[#4caf50] text-white' : 'bg-white'} border`}>
                                            intermediate
                                        </button>
                                        <button type="button" onClick={(e) => setSkill(e.target.value)} value={`advanced`} className={`px-4 py-2 text-sm font-medium text-gray-900 ${skill == 'advanced' ? 'bg-[#4caf50] text-white' : 'bg-white'} border `}>
                                            advanced
                                        </button>
                                        <button type="button" onClick={(e) => setSkill(e.target.value)} value={`professional`} className={`px-4 py-2 text-sm font-medium text-gray-900 ${skill == 'professional' ? 'bg-[#4caf50] text-white' : 'bg-white'} border `}>
                                            professional
                                        </button>
                                    </div>

                                </div>



                                <div className='mt-8 flex gap-5 justify-center'>
                                    {
                                        btnLoader ? <button className='green_btn px-16 w-full flex justify-center py-4 shadow-none'><ButtonLoader /></button>
                                            :
                                            <button onClick={handleEditProfile} className='green_btn w-full rounded-sm shadow-none'>save changes</button>
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

export default EditProfileModal;

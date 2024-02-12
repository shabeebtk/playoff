import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BaseUrl, ImageUrl } from '../../constant/BaseUrl';
import Cookies from 'js-cookie';
import userAxiosInstance from '../../instance/axios/UserAxiosInstance';
import { ChangeEmail, CreateGame, acceptGameRequest, getGameRequests, rejectGameRequest, sentOtpChangeEmail } from '../../instance/endpoints/user/userEndpoints';
import toast, { Toaster } from 'react-hot-toast';
import ButtonLoader from '../loader/ButtonLoader';
import { useDispatch } from 'react-redux';
import { userUpdate } from '../../redux/action/userAuthAction';
import { advanced, amateur, beginner, intermediate, professional, skillValue } from '../../constant_data/SkillValue';

function GameRequestsModal(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [requestedUsers, setRequestedUsers] = useState([])
    const [refresh, setRefresh] = useState(false)

    const successNotification = (message) => toast.success(message);
    const errorNotification = (message) => toast.error(message);
    const dispatch = useDispatch()

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    useEffect(() => {
        userAxiosInstance.post(getGameRequests, {
            game_id: props.game_id
        })
            .then((response) => {
                console.log(response, 'modal')
                setRequestedUsers(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [modalVisible, refresh])

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    const handleAcceptRequest = (user_id, username) => {
        userAxiosInstance.post(acceptGameRequest, {
            requested_user: user_id,
            game_id: props.game_id
        })
            .then((response) => {
                console.log(response)
                successNotification(`accepted ${username}`)
                setRefresh(!refresh)
                props.update()
                toggleModal()
            })
            .catch((error) => {
                console.log(error)
                errorNotification('failed to accept request')
            })

    }

    const handleDeclineRequest = (user_id, username) => {
        userAxiosInstance.post(rejectGameRequest, {
            requested_user: user_id,
            game_id: props.game_id
        })
            .then((response) => {
                console.log(response)
                successNotification(`rejected ${username}`)
                setRefresh(!refresh)
                props.update()
                toggleModal()
            })
            .catch((error) => {
                console.log(error)
                errorNotification('failed to reject player')
            })
    }

    return (
        <div>
            <div>
                <button onClick={toggleModal} className="bg-[#4caf50] px-4 py-2 rounded-sm text-white">see requests ({requestedUsers.length})</button>
            </div>

            {modalVisible && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center md:inset-0 h-screen backdrop-blur-sm bg-black bg-opacity-50">
                    <div className="relative p-4 bg-[#F8F8F8] w-[80%] md:w-[40%] rounded-md">
                        <div className='flex justify-between pr-3'>
                            <h1 className='text-lg font-semibold'>game requests</h1>
                            <button onClick={toggleModal} className='font-semibold'>x</button>
                        </div>

                        <div className='flex flex-col gap-2 mt-3 overflow-y-scroll'>
                            {
                                requestedUsers.map((user, index) => (
                                    <div key={index} className='relative bg-white '>
                                        <p className='absolute top-1 right-2 text-xs'>{formatDateTime(user.date_time)}</p>
                                        <div className=" grid grid-cols-3 bg-white p-3 rounded-lg shadow ">
                                            <div className='flex items-center gap-1'>
                                                {
                                                    user.user.profile_img ? <img style={{ objectFit: "cover" }} className="bg-cover rounded-full h-[60px] w-[60px]" src={`${ImageUrl}${user.user.profile_img}`} alt="no profile" />
                                                        :
                                                        <img style={{ objectFit: "cover" }} className="rounded-full h-[60px] w-[60px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUvSN8kFRl3ADkH6SYy3c3utUKrdNH5Z-Ew&usqp=CAU" alt="" />
                                                }
                                                <div>
                                                    <span className='text-xs bg-[#4caf50] text-white px-1'>{user.user.skill_level}</span>
                                                    <p className='text-sm font-semibold'>{user.user.player_username}</p>
                                                </div>
                                            </div>

                                            <div>

                                            </div>

                                            <div className='flex gap-1 items-center'>
                                                <button onClick={() => handleDeclineRequest(user.user.id, user.user.player_username)} className='py-1 h-[30px] text-xs text-white px-4 bg-red-500'>decline</button>
                                                <button onClick={() => handleAcceptRequest(user.user.id, user.user.player_username)} className='py-1 px-4 h-[30px] text-xs text-white bg-[#4caf50]'>accept</button>
                                            </div>
                                        </div>
                                    </div>

                                ))


                            }

                            {

                                requestedUsers.length == 0 && <div className='py-5 text-center font-semibold'>no requests</div>

                            }
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default GameRequestsModal;

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BaseUrl, ImageUrl, webSocketUrl } from '../../constant/BaseUrl';
import Cookies from 'js-cookie';
import userAxiosInstance from '../../instance/axios/UserAxiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import ButtonLoader from '../loader/ButtonLoader';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdSend } from "react-icons/io";
import { getGameChats } from '../../instance/endpoints/user/userEndpoints';
import { animateScroll } from 'react-scroll'

function GameChatModal(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const successNotification = (message) => toast.success(message);
    const errorNotification = (message) => toast.error(message);
    const dispatch = useDispatch()
    const user = useSelector(state => state.userAuth.user)
    const chatScroll = useRef(null)

    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    console.log(chatHistory)

    const getMessages = () => {
        console.log(props.game.id)
        userAxiosInstance.post(getGameChats, {
            game_id: props.game.id
        })
            .then((response) => {
                console.log(response)
                setChatHistory(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getMessages()
        const ws_scheme = window.location.protocol == 'https' ? 'wss://' : 'ws://'
        // const ws = new WebSocket(`${ws_scheme}${webSocketUrl}${props.game.id}/`);
        const ws = new WebSocket(`wss://52.66.242.228/ws/chat/${props.game.id}/`);
        
        ws.onopen = () => {
            console.log('WebSocket connection opened');
            setSocket(ws);
            console.log(socket, 'socket')
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(event, 'from server')
            console.log(event.data)
            setChatHistory((prevHistory) => [...prevHistory, data.message]);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        autoScroll()
    }, [chatHistory, modalVisible])


    const handleSendMessage = () => {
        if (socket && message) {
            const data = {
                'user_id': user.id,
                'game_id': props.game.id,
                'message': message
            }
            socket.send(JSON.stringify(data));
            setMessage('');
        }
    };

    console.log(props.game)

    const autoScroll = () => {
        if (chatScroll.current) {
            if (chatScroll.current) {
                animateScroll.scrollToBottom({
                    containerId: chatScroll.current.id,
                    duration: 200
                });
            }
        }
    };

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };


    return (
        <div>
            <div>
                <button onClick={toggleModal} className="bg-[#F8F8F8] border border-gray-500 px-5 py-2 rounded-sm font-semibold">game chat</button>
            </div>

            {modalVisible && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center md:inset-0 h-screen backdrop-blur-sm bg-black bg-opacity-50">
                    <div className="relative h-[80%] p-4 bg-[#F8F8F8] md:w-[40%] sm:w-[90%] rounded-md">
                        <div className='flex justify-between pr-3'>
                            <h1 className='text-lg font-semibold'>{props.game.game_name}</h1>
                            <button onClick={toggleModal} className='font-semibold'>x</button>
                        </div>

                        {/* chat  */}
                        <div className='flex h-full gap-2 mt-3'>
                            <div className="flex-grow items-end h-full">
                                {/* Chat messages */}
                                <div ref={chatScroll} id="chatContainer" className="flex flex-col mb-4 gap-4 h-[58vh] overflow-y-auto py-4">
                                    {
                                        chatHistory.map((msg, index) => (

                                            <div key={index}>
                                                {


                                                    user.id != msg.user.id ?
                                                        <div className="flex justify-start items-center gap-1">

                                                            {
                                                                msg.user.profile_img ?
                                                                    <img style={{ objectFit: "cover" }} className="h-[30px] w-[30px] rounded-full" src={`${ImageUrl}${msg.user.profile_img}`} alt="profile" />
                                                                    :
                                                                    <img style={{ objectFit: "cover" }} className="h-[30px] w-[30px] rounded-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUvSN8kFRl3ADkH6SYy3c3utUKrdNH5Z-Ew&usqp=CAU' alt="profile" />

                                                            }
                                                            <div className="bg-[#78E08F] rounded-lg px-4 py-2 max-w-[80%]">
                                                                <p className="text-white text-sm">{msg.message}</p>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="flex items-center gap-1 justify-end">
                                                            <div className="bg-gray-200 rounded-lg px-4 py-2 max-w-[80%]">
                                                                <p className="text-gray-900 text-sm">{msg.message}</p>
                                                            </div>
                                                            {
                                                                msg.user.profile_img ?
                                                                    <img style={{ objectFit: "cover" }} className="h-[30px] w-[30px] rounded-full" src={`${ImageUrl}${msg.user.profile_img}`} alt="profile" />
                                                                    :
                                                                    <img style={{ objectFit: "cover" }} className="h-[30px] w-[30px] rounded-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUvSN8kFRl3ADkH6SYy3c3utUKrdNH5Z-Ew&usqp=CAU' alt="profile" />

                                                            }


                                                        </div>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="flex justify-center items-center h-16">
                                    {/* Chat input */}
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-lg mr-4"
                                        placeholder="Type a message..."
                                        onChange={(e) => setMessage(e.target.value)}
                                        value={message}
                                    />
                                    <button onClick={handleSendMessage} className="bg-[#78E08F] text-white font-bold py-2 px-4 rounded">
                                        <IoMdSend size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default GameChatModal;

import axios from 'axios';
import React, { useState } from 'react';
import { BaseUrl } from '../../constant/BaseUrl';
import Cookies from 'js-cookie';
import userAxiosInstance from '../../instance/axios/UserAxiosInstance';
import { ChangeEmail, CreateGame, sentOtpChangeEmail } from '../../instance/endpoints/user/userEndpoints';
import toast, { Toaster } from 'react-hot-toast';
import ButtonLoader from '../loader/ButtonLoader';
import { useDispatch } from 'react-redux';
import { userUpdate } from '../../redux/action/userAuthAction';
import { advanced, amateur, beginner, intermediate, professional, skillValue } from '../../constant_data/SkillValue';

function CreateActivityModal(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [gameName, setGameName] = useState(`${props.booking.user.player_username}'s game`)
    const [maxPlayers, setMaxPlayers] = useState(0)
    const [skillOption, setSkillOption] = useState(false)
    const [minSkill, setMinSkill] = useState(beginner)
    const [maxSkill, setMaxSkill] = useState(professional)
    const [description, setDescription] = useState('')

    const successNotification = (message) => toast.success(message);
    const errorNotification = (message) => toast.error(message);
    const [otpBtnLoader, setOtpBtnLoader] = useState(false)
    const [btnLoader, setBtnLoader] = useState(false)
    const dispatch = useDispatch()

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleCreateGame = () => {

        if (gameName && maxPlayers && description){

            if (maxPlayers <= 0){
                errorNotification("max players can't be zero")
                return 
            }

            if (skillValue[minSkill] >= skillValue[maxSkill]){
                errorNotification('wrong skill selections')
                return
            }

            console.log(skillValue[minSkill])

            userAxiosInstance.post(CreateGame, {
                booking_id: props.booking.id,
                game_name : gameName,
                max_players: maxPlayers,
                min_skill : minSkill,
                max_skill : maxSkill,
                description : description
            })
            .then((response)=>{
                console.log(response) 
                successNotification('game created successfully')
                toggleModal()
            })
            .catch((error)=>{
                console.log(error)
                if (error.response.status == 409){
                    errorNotification('game already created')
                }
                else{
                    errorNotification('failed to create game')
                }
            })
        }else{
            errorNotification('please fill the blanks')
        }   
    }

    return (
        <div>
            <dir>
                <p onClick={toggleModal} className='hover:underline cursor-pointer'>
                    create game +
                </p>
            </dir>

            {modalVisible && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen backdrop-blur-sm bg-black bg-opacity-50">
                    <div className="relative p-4 w-[97%] max-w-md bg-[#F8F8F8] rounded-md">
                        <div className='flex justify-between pr-3'>
                            <h1 className='text-lg font-semibold'>Create game</h1>
                            <button onClick={toggleModal} className='font-semibold'>x</button>
                        </div>
                        <div className="relative bg-white rounded-lg shadow ">

                            <div className="p-4 md:p-5 text-center ">
                                <div className='mb-3'>
                                    <label className='flex items-start font-semibold' htmlFor="">game name</label>
                                    <input onChange={(e) => setGameName(e.target.value)} value={gameName} type="text" className='w-full border py-2 px-2' placeholder='enter here' />
                                </div>
                                <div className='mb-3'>
                                    <label className='flex items-start font-semibold' htmlFor="">venue</label>
                                    <input disabled value={props.booking.venue.venue_name} type="text" className='w-full bg-gray-100 border py-2 px-2' placeholder='enter here' />
                                </div>
                                <div className='flex gap-2'>
                                    <div className='mb-3 w-[50%]'>
                                        <label className='flex items-start font-semibold' htmlFor="">date</label>
                                        <input disabled value={props.booking.date} type="date" className='w-full bg-gray-100 border py-2 px-2' placeholder='enter here' />
                                    </div>
                                    <div className='mb-3 w-[50%]'>
                                        <label className='flex items-start font-semibold' htmlFor="">time</label>
                                        <input disabled value={props.booking.time} type="text" className='w-full bg-gray-100 border py-2 px-2' placeholder='enter here' />
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='mb-3 w-[50%]'>
                                        <label className='flex items-start font-semibold' htmlFor="">court</label>
                                        <input disabled value={props.booking.court} type="text" className='w-full bg-gray-100 border py-2 px-2' placeholder='enter here' />
                                    </div>
                                    <div className='mb-3 w-[50%]'>
                                        <label className='flex items-start font-semibold' htmlFor="">max players</label>
                                        <input onChange={(e) => setMaxPlayers(e.target.value)} value={maxPlayers} min={0} type="number" className='w-full border py-2 px-2' placeholder='enter here' />
                                    </div>
                                </div>

                                <div className='flex justify-end gap-1'>
                                    <input onChange={() => setSkillOption(!skillOption)} type="checkbox" />
                                    <label htmlFor="skill">skills</label>
                                </div>

                                {
                                    skillOption &&
                                    <div className='flex gap-2 mb-3'>
                                        <div className='flex flex-col w-[50%]'>
                                            <label className='flex items-start font-semibold' htmlFor="">min skill</label>
                                            <select onChange={(e)=> setMinSkill(e.target.value)} className='border px-4 py-2' name="min-skill" id="min-skill">
                                                <option selected value={beginner}>{beginner}</option>
                                                <option value={amateur}>{amateur}</option>
                                                <option value={intermediate}>{intermediate}</option>
                                                <option value={advanced}>{advanced}</option>
                                                <option value={professional}>{professional}</option>
                                            </select>
                                        </div>

                                        <div className='flex flex-col w-[50%]'>
                                            <label className='flex items-start font-semibold' htmlFor="">max skill</label>
                                            <select onChange={(e)=> setMaxSkill(e.target.value)} className='border px-4 py-2' name="min-skill" id="min-skill">
                                                <option value={beginner}>{beginner}</option>
                                                <option value={amateur}>{amateur}</option>
                                                <option value={intermediate}>{intermediate}</option>
                                                <option value={advanced}>{advanced}</option>
                                                <option selected value={professional}>{professional}</option>
                                            </select>
                                        </div>
                                    </div>
                                }

                                <div className='mb-3'>
                                    <label className='flex items-start font-semibold' htmlFor="">description/rules</label>
                                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" className='w-full border py-2 px-2' placeholder='enter here' />
                                </div>


                                <div className='mt-8 flex gap-5 justify-center'>
                                    {
                                        btnLoader ? <button className='green_btn px-16 py-4 shadow-none'><ButtonLoader /></button>
                                            :
                                            <button onClick={handleCreateGame} className='green_btn shadow-none'>create game</button>
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

export default CreateActivityModal;

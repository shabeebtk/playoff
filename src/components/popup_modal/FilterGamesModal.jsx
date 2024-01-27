import axios from 'axios';
import React, { useState } from 'react';
import { BaseUrl } from '../../constant/BaseUrl';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import ButtonLoader from '../loader/ButtonLoader';
import { useDispatch, useSelector } from 'react-redux';
import { advanced, amateur, beginner, intermediate, professional, skillValue } from '../../constant_data/SkillValue';
import { eightAside, elevenAside, fiveAside, nineAside, sevenAside, sixAside, tenAside } from '../../constant_data/AllSides';
import DatePicker from 'react-multi-date-picker'
import { filterGames } from '../../instance/endpoints/user/userEndpoints';

function FilterGamesModal(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const today = new Date().toISOString().split('T')[0]
    const [selectedDates, setSelectedDates] = useState([])
    const successNotification = (message) => toast.success(message);
    const errorNotification = (message) => toast.error(message);
    const [otpBtnLoader, setOtpBtnLoader] = useState(false)
    const [btnLoader, setBtnLoader] = useState(false)
    const dispatch = useDispatch()
    const [isfilter, setIsFilter] = useState(false)
    const user = useSelector(state => state.userAuth.user)

    const [court, setCourt] = useState({
        [fiveAside]: false,
        [sixAside]: false,
        [sevenAside]: false,
        [eightAside]: false,
        [nineAside]: false,
        [tenAside]: false,
        [elevenAside]: false,
    })

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleSelectCourt = (e) => {
        const target = e.target.value
        setCourt({ ...court, [target]: !court[target] })
    }

    const filterResults = async () => {
        const data = {}
        const temp = []
        const dateTemp = []

        if (user){
            data['user'] = user.id
        }
        Object.keys(court).forEach((key) => {
            console.log(key)
            if (court[key]) {
                temp.push(key)
            }
        })
        selectedDates.map((date, index) => (
            dateTemp.push(date.format())
        ))
        data['court'] = temp
        data['dates'] = dateTemp

        await axios.post(`${BaseUrl}${filterGames}`, data)
            .then((response) => {
                console.log(response)
                props.filter(response.data)
                setIsFilter(true)
                toggleModal()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleResetFilter = () => {
        props.refresh()
        setIsFilter(false)
        setSelectedDates([])
        Object.keys(court).forEach((key) => {
            court[key] = false;
        });
    }

    return (
        <div>
            <div className='flex items-center justify-between rounded-md gap-3 border px-4 hover:bg-slate-200 py-1.5 bg-white text-sm'>
                <button onClick={toggleModal} className="block rounded-md">filter</button>
                {isfilter && <button onClick={handleResetFilter} className='font-semibold'>x</button>}
            </div>

            {modalVisible && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen backdrop-blur-sm bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md bg-[#F8F8F8] rounded-md">
                        <div className='flex justify-between pr-3'>
                            <h1 className='text-lg font-semibold'>filter games</h1>
                            <button onClick={toggleModal} className='font-semibold'>x</button>
                        </div>
                        <div className="relative bg-white rounded-lg shadow ">

                            <div className="p-4 md:p-5 text-center ">

                                <div className='flex gap-2'>
                                    <div className='mb-3 w-[100%]'>
                                        <label className='flex items-start font-semibold' htmlFor="">date</label>
                                        {/* <input type="date" multiple onChange={(e)=>setDate(e.target.value)} min={today} className='w-full bg-gray-100 border py-2 px-2' placeholder='enter here' /> */}
                                        <DatePicker className='text-start' multiple onChange={setSelectedDates} minDate={today} value={selectedDates} />
                                    </div>

                                </div>
                                <h2 className='font-semibold text-start mb-1'>select court</h2>
                                <div className='grid grid-cols-4 gap-2'>
                                    <div className='flex items-center gap-1 font-semibold'>
                                        <input checked={court[fiveAside]} value={fiveAside} onClick={(e) => handleSelectCourt(e)} id='1' type="checkbox" />
                                        <label htmlFor='1'>{fiveAside}</label>
                                    </div>
                                    <div className='flex items-center gap-1 font-semibold'>
                                        <input checked={court[sixAside]} value={sixAside} onClick={(e) => handleSelectCourt(e)} id='2' type="checkbox" />
                                        <label htmlFor='2'>{sixAside}</label>
                                    </div>
                                    <div className='flex items-center gap-1 font-semibold'>
                                        <input checked={court[sevenAside]} value={sevenAside} onClick={(e) => handleSelectCourt(e)} id='3' type="checkbox" />
                                        <label htmlFor='3'>{sevenAside}</label>
                                    </div>
                                    <div className='flex items-center gap-1 font-semibold'   >
                                        <input checked={court[eightAside]} value={eightAside} onClick={(e) => handleSelectCourt(e)} id='4' type="checkbox" />
                                        <label htmlFor='4'>{eightAside}</label>
                                    </div>
                                    <div className='flex items-center gap-1 font-semibold'>
                                        <input checked={court[nineAside]} value={nineAside} onClick={(e) => handleSelectCourt(e)} id='5' type="checkbox" />
                                        <label htmlFor='5'>{nineAside}</label>
                                    </div>
                                    <div className='flex items-center gap-1 font-semibold'>
                                        <input checked={court[tenAside]} value={tenAside} onClick={(e) => handleSelectCourt(e)} id='6' type="checkbox" />
                                        <label htmlFor='6'>{tenAside}</label>
                                    </div>
                                    <div className='flex items-center gap-1 font-semibold'>
                                        <input checked={court[elevenAside]} value={elevenAside} onClick={(e) => handleSelectCourt(e)} id='7' type="checkbox" />
                                        <label htmlFor='7'>{elevenAside}</label>
                                    </div>
                                </div>

                                <div className='mt-8 flex gap-5 justify-center'>
                                    {
                                        btnLoader ? <button className='green_btn px-16 py-4 shadow-none'><ButtonLoader /></button>
                                            :
                                            <>
                                                <button onClick={filterResults} className='green_btn shadow-none'>filter</button>
                                            </>
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

export default FilterGamesModal;

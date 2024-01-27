import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AlertBox from "../alert_box/AlertBox";
import axios from 'axios'
import { BaseUrl } from '../../constant/BaseUrl'
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../loader/ButtonLoader";
import { allCities } from "../../constant_data/AllCities";
import { allStates } from "../../constant_data/AllStates";
import _debounce from 'lodash/debounce';
import { binarySearch } from "../../operations/BinarySearch";

function AddVenue() {
    const isAuthenticated = useSelector(state => state.ownerAuth.is_authenticated)
    const navigate = useNavigate()
    const owner = useSelector(state => state.ownerAuth.owner)
    const [venueName, setVenueName] = useState(null)
    const [place, setPlace] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)
    const [location, setLocation] = useState(null)
    const [about, setAbout] = useState(null)
    const [allFacilities, setallFacilities] = useState([])
    const [facility, setFacility] = useState('')
    const [openingTime, setOpeningTime] = useState(null)
    const [closingTime, setClosingTime] = useState(null)
    const [images, setImages] = useState([])
    const [displayImages, setDisplayImages] = useState([])
    const [cityResults, setCityResults] = useState([])
    const [stateResults, setstateResults] = useState([])


    const [price, setPrice] = useState([])
    const [error, setError] = useState(true)
    const [errorMessage, setErrorMessage] = useState('please fill all details')
    const [btnLoader, setBtnLoader] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || !owner) {
            navigate('/owner/login')
        }
    })
    
    const handleSubmit = async () => {
        if (error) {
            return
        }
        setBtnLoader(true);
        await axios.post(`${BaseUrl}owner/add_venue`, {
            owner_id: owner.id,
            'venue_name': venueName,
            'place': place,
            'city': city,
            'state': state,
            'location': location,
            'about_venue': about,
            'opening_time': openingTime,
            'closing_time': closingTime,
            'venue_prices': price,
            'venue_facilities': allFacilities,
            'venue_price': price,
        })
            .then(async (response) => {
                console.log(response);
                console.log(response.data);

                const formData = new FormData()
                formData.append('venue_id', response.data.id)
                images.forEach((file, index) => {
                    formData.append(`images[${index}]`, file);
                });

                await axios.post(`${BaseUrl}owner/save_images`, formData)
                    .then((response) => {
                        console.log(response)
                        setBtnLoader(false);
                        navigate('/owner/venue_requested')
                    })
                    .catch((error) => {
                        console.log(error)
                        setBtnLoader(false);
                    })
                setBtnLoader(false);
            })
            .catch((error) => {
                setBtnLoader(false);
                console.log(error);
            });
    };

    const [checkSide, setCheckSide] = useState({
        '5-aside': false,
        '6-aside': false,
        '7-aside': false,
        '8-aside': false,
        '9-aside': false,
        '10-aside': false,
        '11-aside': false,
    })


    const handleCheckboxChange = (key) => {
        setCheckSide((prevCheckSide) => ({
            ...prevCheckSide,
            [key]: !prevCheckSide[key],
        }));

        console.log(checkSide[key])
        if (checkSide[key] == true) {
            const filteredData = price.filter(item => item.aside !== key);
            setPrice(filteredData)
        }
        validateForm()
    };

    const handleAddFacility = () => {
        if (allFacilities.length < 8 && facility) {
            setallFacilities([...allFacilities, facility])
            setFacility('')
        }
        validateForm()
    }

    const handleRemoveFacility = (key) => {
        console.log(key)
        const filteredData = allFacilities.filter(item => item != key)
        setallFacilities(filteredData)
        setFacility('')
        console.log(filteredData)
        validateForm()
    }

    const handleImageAdd = (e) => {
        if (images.length < 6) {

            const files = e.target.files[0]
            const displayFiles = e.target.files
            const imageArray = Array.from(displayFiles).map((file) => URL.createObjectURL(file))
            imageArray.push(...displayImages)
            setDisplayImages(imageArray)
            const arr = [...images, files]
            setImages(arr);
            console.log(images)
        }
        validateForm()
    }

    const handleImageDelete = (index) => {
        const updatedImages = [...images]

        updatedImages.splice(index, 1)
        setImages(updatedImages)
        setDisplayImages(updatedImages)
        validateForm()
    }

    const handlePrice = (aside, dayPrice, nightPrice) => {
        if (checkSide[aside]) {
            setPrice(prevPrices => {
                const existingIndex = prevPrices.findIndex(price => price.aside === aside);

                if (existingIndex !== -1) {
                    const updatedPrices = [...prevPrices];
                    updatedPrices[existingIndex] = { aside, dayPrice, nightPrice };
                    return updatedPrices;
                } else {
                    return [...prevPrices, { aside, dayPrice, nightPrice }];
                }
            });
        }
        validateForm()
    }

    const HandleSearchCity = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        setCity(searchQuery)
        if (searchQuery != '') {
            const sortedCities = allCities.data
            const filterCity = binarySearch(sortedCities, searchQuery);
            setCityResults(filterCity)
        }else{
            setCityResults([])
        }
    };

    const handleSelectCity = (city) =>{
        setCity(city) 
        setCityResults([])
    }

    const HandleSearchStates = (e)=>{
        const searchQuery = e.target.value.toLowerCase();
        setState(searchQuery)
        if (searchQuery != '') {
            const sortedState = allStates.data
            const filterState = binarySearch(sortedState, searchQuery);
            setstateResults(filterState)
        }else{
            setstateResults([])
        }
    }

    const handleSelectState = (state)=>{
        setState(state)
        setstateResults([])
    }

    const validateForm = () => {
        if (!venueName || !place || !city || !location || !about || allFacilities.length == 0 || !openingTime || !closingTime || images.length == 0 || price.length == 0) {
            console.log(allFacilities.length)
            setErrorMessage('please fill all details')
            setError(true)
        }
        else {
            console.log('clear')
            setErrorMessage('')
            setError(false)
        }
    }

    return (
        <div className="h-[full] md:p-7 bg-gray-150">
            <div className=" rounded-md p-4 md:flex bg-white w-full gap-10">

                <div className="md:w-[50%]">
                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="register_label mb-2"
                        >
                            venue name
                        </label>
                        <div className="flex flex-col items-start">
                            <input onBlur={validateForm} onChange={(e) => setVenueName(e.target.value)} type="text" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5   " />
                        </div>
                    </div>

                    <div className="flex justify-between gap-5">
                        <div className="mb-2 w-full">
                            <label
                                htmlFor="name"
                                className="register_label mb-2"
                            >
                                place
                            </label>
                            <div className="flex flex-col items-start">
                                <input onChange={(e) => setPlace(e.target.value)} onBlur={validateForm} type="text" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " />

                            </div>
                        </div>

                        <div className="mb-2 w-full">
                            <label
                                htmlFor="name"
                                className="register_label mb-2"
                            >
                                city
                            </label>
                            <div className="flex flex-col items-start relative">
                                <input onChange={(e) => HandleSearchCity(e)} value={city} type="text" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " />
                                {cityResults.length > 0 && (
                                    <div className="absolute top-9 z-10 mt-2 w-[18rem] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">
                                            {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                                            {cityResults.map((city, index) => (
                                                <p key={index} onClick={()=> handleSelectCity(city)} className="text-gray-700 cursor-pointer hover:bg-slate-200 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" >
                                                    {city}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="register_label mb-2"
                        >
                            state
                        </label>
                        <div className="flex flex-col items-start relative">
                            <input onChange={(e) => HandleSearchStates(e)} value={state} type="text" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " />
                            {stateResults.length > 0 && (
                                    <div className="absolute top-9 mt-2 w-[18rem] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">
                                            {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                                            {stateResults.map((state, index) => (
                                                <p key={index} className="text-gray-700 cursor-pointer hover:bg-slate-200 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" onClick={() => {handleSelectState(state)}}>
                                                    {state}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="register_label mb-2"
                        >
                            location link
                        </label>
                        <div className="flex flex-col items-start">
                            <input onChange={(e) => setLocation(e.target.value)} onBlur={validateForm} type="url" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " />
                        </div>
                    </div>

                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="register_label mb-2"
                        >
                            about venue
                        </label>
                        <div className="flex flex-col items-start">
                            <textarea onChange={(e) => setAbout(e.target.value)} onBlur={validateForm} type="text" rows='5' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " />
                        </div>
                    </div>

                    {/* facility  */}
                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="register_label mb-2"
                        >
                            facilities
                        </label>
                        <div className="flex gap-3 items-start">
                            <input onChange={(e) => setFacility(e.target.value)} value={facility} type="text" placeholder="parking.." className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5   " />
                            <button onClick={handleAddFacility} className="green_btn shadow-sm">add+</button>
                        </div>

                        <div className="grid grid-cols-4  w-[85%] gap-3">

                            {
                                allFacilities.map((facility1, index) => (
                                    <div key={index} className="border-2 w-full text-center rounded-md py-1 px-2 flex items-center bg-[#F8F8F8]">
                                        <p className="w-full ">{facility1}</p>
                                        <IoIosClose size={20} onClick={() => handleRemoveFacility(facility1)} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>

                <div className="md:w-[50%]">

                    {/* time  */}
                    <div className="flex justify-between gap-5">
                        <div className="mb-2 w-full">
                            <label
                                htmlFor="name"
                                className="register_label mb-2"
                            >
                                opening time
                            </label>
                            <div className="flex flex-col items-start">
                                <input type="time" onBlur={validateForm} onChange={e => setOpeningTime(e.target.value)} placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " />

                            </div>
                        </div>

                        <div className="mb-2 w-full">
                            <label
                                htmlFor="name"
                                className="register_label mb-3"
                            >
                                closing time
                            </label>
                            <div className="flex flex-col items-start">
                                <input type="time" onBlur={validateForm} onChange={e => setClosingTime(e.target.value)} placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " />
                            </div>
                        </div>
                    </div>


                    <h2 className="my-2">available sides</h2>
                    {/* price table  */}
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="md:px-6 md:py-3 px-4 py-2">
                                        select available sides
                                    </th>
                                    <th scope="col" className="md:px-6 md:py-3 px-4 py-2">
                                        day ₹/hour
                                    </th>
                                    <th scope="col" className="md:px-6 md:py-3 px-4 py-2">
                                        night ₹/hour
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(checkSide).map((aside, index) => (
                                    <tr className="bg-white border-b" key={index}>
                                        <th scope="row" className="md:px-6 md:py-4 px-4 py-2 font-medium  ">
                                            <input onBlur={validateForm} checked={checkSide[aside]} onChange={() => { handleCheckboxChange(aside) }} id="5-checkbox" type="checkbox" value="5-aside" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                            <label htmlFor="5-checkbox" className="ms-2 text-sm font-medium text-black">{aside}</label>
                                        </th>

                                        <td className="px-6 py-3">
                                            {checkSide[aside] == true ?
                                                <div className="flex items-center gap-1">
                                                    <p>₹</p>
                                                    <input onBlur={(e) => handlePrice(aside, e.target.value, price.find(p => p.aside === aside)?.dayPrice)} className="border-b-2 px-1 py-2" placeholder="" type="text" />
                                                </div>
                                                :
                                                <div></div>

                                            }
                                        </td>
                                        <td className="md:px-6 md:py-3 px-4 py-2">
                                            {checkSide[aside] == true ?
                                                <div className="flex items-center gap-1">
                                                    <p>₹</p>
                                                    <input onBlur={(e) => handlePrice(aside, price.find(p => p.aside === aside)?.dayPrice, e.target.value)} className="border-b-2 px-1 py-2" placeholder="" type="text" />
                                                </div>
                                                :
                                                <div></div>
                                            }
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* images  */}
            <div className="px-2">
                <div className="w-full">

                    <label
                        htmlFor="name"
                        className="register_label mb-2"
                    >
                        add images (min - 3, max - 6)
                    </label>
                    <div className="flex flex-col items-start">
                        <input onChange={handleImageAdd} type="file" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " />
                    </div>

                    <div className="mt-5 grid md:grid-cols-6 grid-cols-2 gap-3 mb-10" >
                        {displayImages.map((image, index) => (
                            <div key={index}>
                                <img
                                    className="h-[80%] w-full"
                                    key={index}
                                    src={image}
                                    alt={`Selected ${index + 1}`}
                                />
                                <button onClick={() => handleImageDelete(index)} className="py-1 px-2 border-2 w-full bg-gray-300 text-sm">remove</button>
                            </div>

                        ))}

                        <div className="text-center">
                            <p className="text-lg ">{images.length == 0 ? 'NO IMAGES ADDED' : ''}</p>
                        </div>
                    </div>
                </div>
            </div>

            {
                error ? <AlertBox error={errorMessage} /> : ''
            }

            {
                !btnLoader ?

                    <button onClick={handleSubmit} className="green_btn mx-1 rounded-sm w-full mt-3">SUBMIT</button>
                    :
                    <button className="w-full flex justify-center px-4 py-3.5 mt-3 tracking-wide text-white transition-colors duration-200 transform bg-[#4caf50] rounded-md">
                        <ButtonLoader />
                    </button>
            }

        </div>
    );
}

export default AddVenue;

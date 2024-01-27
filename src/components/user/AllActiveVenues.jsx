import axios from "axios";
import { useEffect, useState } from "react";
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import querystring from 'query-string'
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { allCities } from "../../constant_data/AllCities";
import { binarySearch } from "../../operations/BinarySearch";
import { FaLocationCrosshairs } from "react-icons/fa6";
import LineLoader from "../loader/LineLoader";

function AllActiveVenues() {
    const [allVenues, setAllVenues] = useState([])
    const [searchVenue, setSearchVenue] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const [lineloader, setLineLoader] = useState(false)
    const chooseCity = localStorage.getItem('city')
    const [city, setCity] = useState(chooseCity)
    const [cityResults, setCityResults] = useState([])
    const [refreshVenues, setRefreshVenues] = useState(false)

    useEffect(() => {
        setLineLoader(true)

        if (city) {
            handleSelectCity(city)
        }
        else {
            axios.get(`${BaseUrl}venue/all_venues`, {})
                .then((response) => {
                    console.log(response)
                    setAllVenues(response.data)
                    setSearchVenue(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    setLineLoader(false)
                })
        }
        setRefreshVenues(false)
    }, [refreshVenues])

    const ViewVenueDetails = (id) => {
        const data = {
            venue_id: id
        }
        const queryStringData = querystring.stringify(data)
        navigate(`/venue_details?${queryStringData}`)
    }

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase();

        if (city && searchQuery == '') {
            handleSelectCity(city)
        }
        else {
            setCityResults([])
        }

        const filterData = allVenues.filter((venue) =>
            venue.venue_name.toLowerCase().includes(searchQuery) ||
            venue.place.toLowerCase().includes(searchQuery) ||
            venue.city.toLowerCase().includes(searchQuery)

        )

        setSearchVenue(filterData)
        setSearchValue(searchQuery)
    }


    const HandleSearchCity = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        setCity(searchQuery)
        if (searchQuery != '') {
            const sortedCities = allCities.data
            const filterCity = binarySearch(sortedCities, searchQuery);
            setCityResults(filterCity)
        } else {
            setRefreshVenues(true)
            setCityResults([])
        }
    };

    const handleSelectCity = (city) => {
        setCity(city)
        setCityResults([])
        axios.post(`${BaseUrl}venue/city_venues`, {
            city: city
        })
            .then((response) => {
                console.log(response)
                setSearchVenue(response.data)
                localStorage.setItem('city', city)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLineLoader(false)
            })
    }

    return (
        <>
            {lineloader && <LineLoader />}

            <div className="px-4 sm:px-[3%] h-full pb-[5vh] md:pb-[20vh] py-8 bg-[#F1F3F2]">

                {/* filter  */}
                <div className="bg-[#F8F8F8] border md:py-4 py-2 flex flex-col sm:flex-row justify-between px-4 sm:px-5 items-center rounded mb-5">
                    {/* Title */}
                    <div className="mb-2 sm:mb-0">
                        <h2 className="md:text-2xl text-xl font-semibold">BOOK YOUR VENUE</h2>
                    </div>

                    {/* Search */}
                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-5">
                        <div className="mb-2 sm:mb-0">
                            <form>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <IoSearch color="gray" />
                                    </div>
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="w-full rounded-md border p-2 ps-10 text-sm"
                                        placeholder="Search venues..."
                                        onChange={(e) => handleSearch(e)}
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Location Search */}
                        <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2 border-gray-300 bg-white border rounded-md pl-2">
                                <FaLocationCrosshairs color="gray" />
                                <input
                                    onChange={(e) => HandleSearchCity(e)}
                                    value={city}
                                    type="text"
                                    placeholder="Search city"
                                    className="border text-gray-900 outline-none text-sm rounded-sm block w-full py-1.5 border-none"
                                />
                            </div>

                            {/* City Results */}
                            {cityResults.length > 0 && (
                                <div className="absolute md:top-[24%] sm:top-auto z-10 mt-2 w-[12rem] sm:w-[auto] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div className="py-1" role="none">
                                        {cityResults.map((city, index) => (
                                            <p key={index} className="text-gray-700 cursor-pointer hover:bg-slate-200 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" onClick={() => { handleSelectCity(city) }}>
                                                {city}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* all venues  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-2">
                    {searchVenue.map((venue, index) => (
                        <div key={index} className="max-w-sm border hover:shadow-lg border-1 rounded-md shadow">
                            <div>
                                <img
                                    className="rounded-t-md md:h-[200px] h-[180px] w-full"
                                    src={`${ImageUrl}${venue.venue_images[0]['image']}`}
                                    alt=""
                                    style={{ aspectRatio: '16/10', objectFit:'cover' }}
                                    
                                />
                            </div>
                            <div className="p-2">
                                <a href="#">
                                    <h5 className="text-md font-bold">
                                        {venue.venue_name}
                                    </h5>
                                </a>
                                <p className="text-sm">
                                    {venue.place},{venue.city}
                                </p>
                                <p className="mb-1 text-sm">
                                    {venue.state}
                                </p>
                            </div>
                            <div className="flex justify-end x">
                                <button onClick={() => ViewVenueDetails(venue.id)} className="green_btn shadow-none">book now</button>
                            </div>
                        </div>
                    ))}
                    {searchVenue.length === 0 && <div className="h-screen"><h1>no venues found</h1></div>}
                </div>
            </div>
        </>



    )
}

export default AllActiveVenues
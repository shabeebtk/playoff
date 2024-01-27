import axios from "axios";
import { useEffect, useState } from "react";
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import querystring from 'query-string'
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { allCities } from "../../constant_data/AllCities";
import { binarySearch } from "../../operations/BinarySearch";
import { FaLocationCrosshairs } from "react-icons/fa6";
import LineLoader from "../loader/LineLoader";
import { CheckUserJoinedGames, GetAllGames, GetUsersGame, getUserHostedGame } from "../../instance/endpoints/user/userEndpoints";
import toast from "react-hot-toast";
import { MdAccessTime } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { TbSoccerField } from "react-icons/tb";
import { GiDuration } from "react-icons/gi";
import { useSelector } from "react-redux";
import FilterGamesModal from "../popup_modal/FilterGamesModal";
import userAxiosInstance from "../../instance/axios/UserAxiosInstance";


function AllGames() {

    const user = useSelector(state => state.userAuth.user)
    const [allGames, setallGames] = useState([])
    const [searchGames, setSearchGames] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const [lineloader, setLineLoader] = useState(false)
    const chooseCity = localStorage.getItem('city')
    const [city, setCity] = useState(chooseCity)
    const [cityResults, setCityResults] = useState([])
    const [refreshGames, setRefreshGames] = useState(false)
    const [filter, setFilter] = useState()
    const errorNotification = (message) => toast.error(message)

    useEffect(() => {
        if (user) {
            setLineLoader(true)
            userAxiosInstance.get(GetUsersGame)
                .then((response) => {
                    console.log(response.data, 'games data')
                    setallGames(response.data)
                    axios.post(`${BaseUrl}${CheckUserJoinedGames}`, {
                        user_id: user.id,
                    })
                })
                .catch((error) => {
                    errorNotification('failed to get games')
                })
                .finally(() => {
                    setLineLoader(false)
                })
        } else {
            console.error('here')
            setLineLoader(true)
            axios.get(`${BaseUrl}${GetAllGames}`)
                .then((response) => {
                    setallGames(response.data)
                })
                .catch((error) => {
                    errorNotification('failed to get games')
                })
                .finally(() => {
                    setLineLoader(false)
                })
        }

    }, [refreshGames])

    const viewGameDetails = (id) => {
        const data = {
            game_id: id
        }
        const queryStringData = querystring.stringify(data)
        navigate(`/game/details?${queryStringData}`)
    }


    const HandleSearchCity = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        setCity(searchQuery)
        if (searchQuery != '') {
            const sortedCities = allCities.data
            const filterCity = binarySearch(sortedCities, searchQuery);
            setCityResults(filterCity)
        } else {
            setRefreshGames(true)
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
                // setSearchVenue(response.data)
                localStorage.setItem('city', city)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLineLoader(false)
            })
    }

    const handleFilter = (data) => {
        setallGames(data)
    }

    const handleRefreshGames = () => {
        setRefreshGames(!refreshGames)
    }

    return (
        <>
            {lineloader && <LineLoader />}

            <div className="px-4 sm:px-[3%] h-[100vh] py-8 bg-[#F1F3F2]">

                {/* filter  */}
                <div className="bg-[#F8F8F8] py-2 border sm:h-[10vh] flex flex-col sm:flex-row justify-between px-4 sm:px-5 items-center rounded mb-5">
                    {/* Title */}
                    <div className="mb-2 sm:mb-0">
                        <h2 className="md:text-2xl  font-semibold">JOIN GAMES</h2>
                    </div>

                    {/* Search */}
                    <div className="flex sm:flex-row items-start gap-2 sm:gap-5">
                        <div className="mb-2 sm:mb-0">
                            <form>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <IoSearch color="gray" />
                                    </div>
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="block w-full sm:w-[50vh] rounded-md border p-2 ps-10 text-sm"
                                        placeholder="Search games..."
                                    // onChange={(e) => handleSearch(e)}
                                    />
                                </div>
                            </form>
                        </div>

                        <div>
                            <FilterGamesModal refresh={handleRefreshGames} filter={handleFilter} />
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
                                    className="border text-gray-900 outline-none text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full py-1.5 border-none"
                                />
                            </div>

                            {/* City Results */}
                            {cityResults.length > 0 && (
                                <div className="absolute md:top-[27%] sm:top-auto z-10 mt-2 w-[12rem] sm:w-[auto] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
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


                {/* all games  */}
                <div className="grid md:grid-cols-2 gap-3">
                    {
                        allGames.map((game, index) => (
                            <div key={index} onClick={() => viewGameDetails(game.id)} className="border relative p-3 bg-white shadow-sm cursor-pointer rounded-md">
                                {game.joined_users.map((game_user, index) => (
                                    user && user.id == game_user.user.id && <p className="absolute bg-green-400 px-2  text-xs rounded-md text-white top-1 right-2">{game_user.game_status}</p>
                                ))
                                }
                                <div className="flex gap-3">
                                    <div className="flex flex-col items-center gap-3 w-[30%] md:w-[25%] ">
                                        {
                                            game.user.profile_img ?
                                                <img style={{ objectFit: "cover" }} className="md:h-[110px] md:w-[110px] h-[70px] w-[70px] rounded-full" src={`${ImageUrl}${game.user.profile_img}`} alt="profile" />
                                                :
                                                <img style={{ objectFit: "cover" }} className="md:h-[110px] md:w-[110px] h-[70px] w-[70px]  rounded-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUvSN8kFRl3ADkH6SYy3c3utUKrdNH5Z-Ew&usqp=CAU' alt="profile" />

                                        }

                                        <h3 className="font-semibold text-sm md:text-md">{game.user.player_username}</h3>
                                    </div>
                                    <div className="flex flex-col w-[50%] md:w-[40%]">
                                        <button disabled className="text-xs md:block hidden mb-1 text-white w-[70%] border px-2 bg-[#4caf50] py-1.5">{game.min_skill} - {game.max_skill}</button>
                                        <h3 className="font-bold text-sm md:text-md flex gap-1 items-center"><TbSoccerField color="green" />{game.booking.venue.venue_name}</h3>
                                        <p className="md:text-sm text-xs font-semibold flex gap-1 items-center"><IoLocationSharp color="green" />{game.booking.venue.place}, {game.booking.venue.city}</p>
                                        <p className="md:text-sm text-xs font-semibold flex gap-1 items-center"><MdOutlineDateRange color="green" />{game.booking.date}</p>
                                        <p className="md:text-sm text-xs font-semibold flex gap-1 items-center"><MdAccessTime color="green" />{game.booking.time}</p>
                                        <p className="md:text-sm text-xs font-semibold flex gap-1 items-center"><GiDuration color="green" />{game.booking.duration} hour</p>
                                    </div>

                                    <div className="flex flex-col justify-end items-end w-[20%] md:w-[30%] ml-5">
                                        <p className="md:text-sm text-xs font-semibold text-end">{game.booking.court}</p>
                                        <p className="font-bold md:text-sm text-xs">{game.joined_players}/{game.max_players}</p>
                                    </div>
                                </div>
                            </div>
                        ))

                    }

                    {allGames.length == 0 &&
                        <div>
                            no games found
                        </div>
                    }
                </div>

            </div>
        </>



    )
}

export default AllGames
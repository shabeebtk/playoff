import { useEffect, useState } from "react"
import userAxiosInstance from "../../instance/axios/UserAxiosInstance"
import { getUserHostedGame, getUserJoinedGame } from "../../instance/endpoints/user/userEndpoints"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl"
import { GiDuration, GiGoalKeeper, GiSoccerKick } from "react-icons/gi"
import { TbSoccerField } from "react-icons/tb"
import { IoLocationSharp } from "react-icons/io5"
import { MdAccessTime, MdOutlineDateRange } from "react-icons/md"
import GamesCardSkeleton from "../loader/GamesCardSkeleton"

function UserGames() {

    const user = useSelector(state => state.userAuth.user)
    const [hostedGames, setHostedGames] = useState([])
    const [showHostedGames, setShowHostedGames] = useState(true)
    const successNotification = (message) => toast.success(message);
    const errorNotification = (message) => toast.error(message);
    const [loadSkeleton, setLoadSkeleton] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getHostedGames()
    }, [])

    const getHostedGames = () => {
        if (user) {
            setLoadSkeleton(true)
            userAxiosInstance.get(getUserHostedGame)
                .then((response) => {
                    console.log(response.data)
                    setHostedGames(response.data)
                    setShowHostedGames(true)
                })
                .catch((error) => {
                    console.log(error)
                    errorNotification('failed to get')
                })
                .finally(() => {
                    setLoadSkeleton(false)
                })
        } else {
            errorNotification('login required')
            navigate('/login')
        }
    }

    const getJoinedGames = () => {
        if (user) {
            setLoadSkeleton(true)
            userAxiosInstance.get(getUserJoinedGame)
                .then((response) => {
                    console.log(response.data)
                    setHostedGames(response.data)
                    setShowHostedGames(false)
                })
                .catch((error) => {
                    console.log(error)
                    errorNotification('failed to get')
                })
                .finally(() => {
                    setLoadSkeleton(false)
                })
        } else {
            errorNotification('login required')
            navigate('/login')
        }
    }

    const active = "bg-[#F8F8F8] w-full border text-center md:py-4 p-2"
    const inActive = "w-full border text-center md:py-4 p-2"


    return (
        <>
            <div className="md:p-5">
                <div className="flex justify-between mb-3">
                    <div className={showHostedGames ? active : inActive}>
                        <p onClick={getHostedGames} className="cursor-pointer font-semibold">your games</p>
                    </div>
                    <div className={showHostedGames ? inActive : active}>
                        <p onClick={getJoinedGames} className="cursor-pointer font-semibold">joined games</p>
                    </div>
                </div>
                {
                    !loadSkeleton ?

                        hostedGames.map((game, index) => (
                            <div key={index} className="mb-3 relative">
                                <Link to={`/game/details?game_id=${game.id}`}>
                                    <div className="bg-white p-5 pb-4 border">
                                        <div className="flex md:flex-row gap-3">

                                            <div className="flex items-center w-[50%]  md:w-[15%]">
                                                {
                                                    game.user.profile_img ?
                                                        <img style={{ objectFit: "cover" }} className="h-[100px] w-[100px] md:h-[120px] md:w-[120px] rounded-full" src={`${ImageUrl}${game.user.profile_img}`} alt="profile" />
                                                        :
                                                        <img style={{ objectFit: "cover" }} className="h-[100px] w-[100px] md:h-[120px] md:w-[120px] rounded-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUvSN8kFRl3ADkH6SYy3c3utUKrdNH5Z-Ew&usqp=CAU' alt="profile" />
                                                }
                                            </div>
                                            <div className="flex flex-col w-full md:w-[50%] mt-4 md:mt-0">
                                                <h3 className="text-md font-semibold flex gap-1 items-center"><TbSoccerField color="green" />{game.booking.venue.venue_name}</h3>
                                                <p className="text-sm font-semibold flex gap-1 items-center"><IoLocationSharp color="green" />{game.booking.venue.place}, {game.booking.venue.city}</p>
                                                <p className="text-sm font-semibold flex gap-1 items-center"><MdOutlineDateRange color="green" />{game.booking.date}</p>
                                                <p className="text-sm font-semibold flex gap-1 items-center"><MdAccessTime color="green" />{game.booking.time}</p>
                                                <p className="text-sm font-semibold flex gap-1 items-center"><GiDuration color="green" />{game.booking.duration} hour</p>
                                                <p className="text-sm font-semibold flex gap-1 items-center"><GiGoalKeeper color="green" />{game.booking.court}</p>
                                            </div>

                                            <div className="md:flex hidden md:block items-center w-full md:w-auto mt-4 md:mt-0">
                                                <Link to={`/game/details?game_id=${game.id}`}>
                                                    <button className="bg-[#4caf50] py-2 px-4 rounded-md text-white">view</button>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-1 right-2">
                                            <p className="text-sm">{game.joined_players}/{game.max_players}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        ))
                        :
                        <div>
                            <GamesCardSkeleton />
                            <GamesCardSkeleton />
                            <GamesCardSkeleton />
                        </div>

                }


            </div>


        </>
    )

}


export default UserGames
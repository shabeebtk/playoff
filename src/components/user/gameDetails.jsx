import axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { GiDuration } from "react-icons/gi";
import { IoLocationSharp } from "react-icons/io5";
import { MdAccessTime, MdMessage, MdOutlineDateRange } from "react-icons/md";
import { TbSoccerField } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl";
import { CheckUserInGame, getGameDetails, requestGame } from "../../instance/endpoints/user/userEndpoints";
import { GiSoccerKick } from "react-icons/gi";
import { GiGoalKeeper } from "react-icons/gi";
import userAxiosInstance from "../../instance/axios/UserAxiosInstance";
import { accepted, rejected, removed, requested } from "../../constant/UserGameStatus";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import GameRequestsModal from "../popup_modal/GameRequestsModal";
import GameChatModal from "../popup_modal/GameChatModal";
import LineLoader from "../loader/LineLoader";
import { TbPlayFootball } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";

function GameDetails() {

    const location = useLocation()
    const queryParams = queryString.parse(location.search)
    const { game_id } = queryParams
    const [gameDetails, setGameDetails] = useState(null)
    const [joinedUsers, setJoinedUsers] = useState([])
    const [userInGame, setUserInGAme] = useState({})
    const [refresh, setRefresh] = useState(false)
    const user = useSelector(state => state.userAuth.user)
    const successNotification = (message) => toast.success(message);
    const errorNotification = (message) => toast.error(message);
    const [lineloader, setLineLoader] = useState(false)

    console.log(userInGame, 'check user gaem')

    useEffect(() => {
        setLineLoader(true)
        axios.post(`${BaseUrl}${getGameDetails}`, {
            game_id: game_id
        })
            .then((response) => {
                console.log(response)
                setGameDetails(response.data)
                setJoinedUsers(response.data.joined_users)

                if (user) {
                    axios.post(`${BaseUrl}${CheckUserInGame}`, {
                        game_id: game_id,
                        user_id: user.id
                    })
                        .then((response) => {
                            console.log(response, 'working')
                            setUserInGAme(response.data)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLineLoader(false)
            })
    }, [refresh])

    const handleRequestGame = () => {

        if (user) {
            setLineLoader(true)
            userAxiosInstance.post(requestGame, {
                game_id: game_id
            })
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    setRefresh(!refresh)
                    setLineLoader(false)
                })
        } else {
            errorNotification('login required')
        }

    }

    return (
        <>
            {lineloader && <LineLoader />}

            {
                gameDetails &&

                <div className="px-4 md:px-[3%] h-full py-8 bg-[#F1F3F2]">
                    <div className="h-full bg-white p-5 rounded-md">
                        <div className="bg-white pb-4 mb-3   border-b">
                            <div className="flex flex-col md:flex-row gap-3">

                                <div className="flex flex-col items-center gap-3 w-full md:w-[20%]">
                                    {
                                        gameDetails.user.profile_img ?
                                            <img style={{ objectFit: "cover" }} className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] rounded-full" src={`${ImageUrl}${gameDetails.user.profile_img}`} alt="profile" />
                                            :
                                            <img style={{ objectFit: "cover" }} className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] rounded-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUvSN8kFRl3ADkH6SYy3c3utUKrdNH5Z-Ew&usqp=CAU' alt="profile" />
                                    }
                                </div>
                                <div className="flex-col items-center w-full md:w-[60%] mt-4 md:mt-0">
                                    <h3 className="font-semibold text-xl flex gap-1 items-center"><GiSoccerKick color="green" />{gameDetails.game_name}</h3>
                                    <h3 className="text-md font-semibold flex gap-1 items-center"><TbSoccerField color="green" />{gameDetails.booking.venue.venue_name}</h3>
                                    <p className="text-sm font-semibold flex gap-1 items-center"><IoLocationSharp color="green" />{gameDetails.booking.venue.place}, {gameDetails.booking.venue.city}</p>
                                    <p className="text-sm font-semibold flex gap-1 items-center"><MdOutlineDateRange color="green" />{gameDetails.booking.date}</p>
                                    <p className="text-sm font-semibold flex gap-1 items-center"><MdAccessTime color="green" />{gameDetails.booking.time}</p>
                                    <p className="text-sm font-semibold flex gap-1 items-center"><GiDuration color="green" />{gameDetails.booking.duration} hour</p>
                                    <p className="text-sm font-semibold flex gap-1 items-center"><GiGoalKeeper color="green" />{gameDetails.booking.court}</p>
                                </div>

                                <div className="flex items-center justify-center w-full md:w-auto mt-4 md:mt-0">
                                    <div>
                                        {
                                            gameDetails.expired == true ?
                                                <p className="px-4 py-2 rounded-sm text-[#4caf50]">game ended</p>
                                                : user && user.id == gameDetails.user.id ?
                                                    <div className="flex flex-col gap-1">
                                                        <GameRequestsModal game_id={gameDetails.id} update={() => setRefresh(!refresh)} />
                                                        <GameChatModal game={gameDetails} />
                                                    </div>
                                                    :
                                                    userInGame.game_status == 'requested' ?
                                                        <p className="px-4 py-2 rounded-sm text-[#4caf50]">requested</p>

                                                        : userInGame.game_status == 'accepted' ?
                                                            <div>
                                                                <GameChatModal game={gameDetails} />
                                                            </div>
                                                            : userInGame.game_status == 'rejected' ?
                                                                <p className="px-4 py-2 rounded-sm text-[#eb3535]">rejected</p>
                                                                : userInGame.game_status == 'removed' ?
                                                                    <p className="px-4 py-2 rounded-sm text-[#eb3535]">removed</p>
                                                                    :
                                                                    <>
                                                                        {
                                                                            gameDetails.joined_players >= gameDetails.max_players ?
                                                                                <button className="bg-red-500 px-4 py-2 rounded-sm text-white">game full</button>
                                                                                : lineloader ?
                                                                                    <button className="bg-[#4caf50] px-4 py-2 rounded-sm text-white" disabled>Loading...</button>
                                                                                    :
                                                                                    <button onClick={handleRequestGame} className="bg-[#4caf50] px-4 py-2 rounded-sm text-white">request</button>
                                                                        }

                                                                    </>
                                        }

                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* game skill  */}
                        <div className="rounded p-3 mb-2 border-b">
                            <h2 className="text-lg font-semibold flex items-center gap-2"><TbPlayFootball /> skill</h2>
                            <div className="pl-5 p-1">
                                <button disabled className="text-xs mb-1 text-white border px-2 bg-[#4caf50] py-1.5">{gameDetails.min_skill} - {gameDetails.max_skill}</button>
                            </div>
                        </div>

                        {/* rules  */}
                        <div className="rounded p-3 mb-2">
                            <h2 className="text-lg font-semibold flex items-center gap-2"><MdMessage /> description/rules</h2>
                            <div className="pl-5 bg-[#F8F8F8] p-1">
                                <p style={{ whiteSpace: 'pre' }} className="w-full h-full pt-2 pb-4">{gameDetails.description}</p>
                            </div>
                        </div>

                        {/* joined players  */}
                        <div className="rounded p-3 mb-2">
                            <h2 className="text-lg font-semibold flex items-center gap-2"><FaUsers /> joined players ({gameDetails.joined_players}/{gameDetails.max_players}) <p className="text-sm font-normal text-red-500"> {gameDetails.joined_players >= gameDetails.max_players && 'game full'}</p></h2>
                            <div className="flex flex-col md:flex-row">
                                <div className="pl-5 flex items-center gap-2 p-1">
                                    {
                                        gameDetails.user.profile_img ?
                                            <img style={{ objectFit: "cover" }} className="h-[50px] w-[50px] rounded-full" src={`${ImageUrl}${gameDetails.user.profile_img}`} alt="profile" />
                                            :
                                            <img style={{ objectFit: "cover" }} className="h-[50px] w-[50px] rounded-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUvSN8kFRl3ADkH6SYy3c3utUKrdNH5Z-Ew&usqp=CAU' alt="profile" />
                                    }
                                    <p>{gameDetails.user.player_username} [host]</p>
                                </div>

                                {joinedUsers.map((player, index) => (
                                    player.game_status == 'accepted' &&
                                    <div key={index} className="pl-5 flex items-center gap-2 p-1">
                                        {
                                            player.user.profile_img == null ?
                                                <img style={{ objectFit: "cover" }} className="h-[50px] w-[50px] rounded-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUvSN8kFRl3ADkH6SYy3c3utUKrdNH5Z-Ew&usqp=CAU' alt="profile" />
                                                :
                                                <img style={{ objectFit: "cover" }} className="h-[50px] w-[50px] rounded-full" src={`${ImageUrl}${player.user.profile_img}`} alt="profile" />
                                        }
                                        <p>{player.user.player_username}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            }
        </>

    )
}

export default GameDetails;
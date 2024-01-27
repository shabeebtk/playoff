import Navbar from "../../components/navbar/Navbar"
import UserGames from "../../components/user/UserGames"
import UserSideBar from "../../components/user/UserSideBar"

function UserGamesPage() {
    return (
        <>
            <Navbar />
            <div className="px-[3%] mt-6 md:flex gap-5 ">
                <div className="flex items-start">
                    <UserSideBar sidebar='player_games' />
                </div>

                <div className="border w-full h-full">
                    <UserGames />
                </div>
            </div>
        </>
    )
}

export default UserGamesPage
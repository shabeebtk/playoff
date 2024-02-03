import Navbar from "../../components/navbar/Navbar"
import UserPersonalDetails from "../../components/user/UserPersonalDetails"
import UserSideBar from "../../components/user/UserSideBar"
import { backgoundImage } from "../../constant_data/BackgroundImage"

backgoundImage['backgroundColor'] = 'rgba(255, 0, 0, 0.1)';

function UserPersonalDetailsPage() {
    return (
        <>
            <Navbar />
            <div style={backgoundImage} className="px-[3%] min-h-screen pt-6 md:flex gap-5 ">
                <div className="flex items-start">
                    <UserSideBar sidebar='personal' />
                </div>

                <div className="border w-full h-full">
                    <UserPersonalDetails />
                </div>
            </div>
        </>
    )
}

export default UserPersonalDetailsPage
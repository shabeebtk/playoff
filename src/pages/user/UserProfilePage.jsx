import Navbar from "../../components/navbar/Navbar";
import UserProfile from "../../components/user/UserProfile";
import UserSideBar from "../../components/user/UserSideBar";
import { backgoundImage } from "../../constant_data/BackgroundImage";

function UserProfilePage() {
    return (
        <>
            <Navbar />
            <div style={backgoundImage} className="px-[3%] min-h-screen pt-6 md:flex gap-5 h-screen">

                <div className="flex items-start">
                    <UserSideBar sidebar='dashboard' />
                </div>

                <div className="border w-full">
                    <UserProfile />
                </div>
            </div>
        </>
    )
}

export default UserProfilePage;
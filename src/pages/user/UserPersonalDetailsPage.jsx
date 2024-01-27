import Navbar from "../../components/navbar/Navbar"
import UserPersonalDetails from "../../components/user/UserPersonalDetails"
import UserSideBar from "../../components/user/UserSideBar"


function UserPersonalDetailsPage() {
    return (
        <>
            <Navbar />
            <div className="px-[3%] mt-6 md:flex gap-5 ">
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
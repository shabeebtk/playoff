import Navbar from "../../components/navbar/Navbar"
import UserBookings from "../../components/user/UserBookings"
import UserSideBar from "../../components/user/UserSideBar"
import { backgoundImage } from "../../constant_data/BackgroundImage"

function UserBookingPage() {
    return (
        <>
            <Navbar />
            <div style={backgoundImage} className="px-[3%] pt-6 md:flex gap-5 ">
                <div className="flex items-start">
                    <UserSideBar sidebar='bookings' />
                </div>

                <div className="border w-full h-full">
                    <UserBookings />
                </div>
            </div>
        </>
    )
}

export default UserBookingPage
import OwnerNavbar from "../../components/navbar/OwnerNavbar";
import Bookings from "../../components/owner/Bookings";
import SideBar from "../../components/owner/SideBar";

function BookingsPage() {
    return (
        <>
            <OwnerNavbar />
            <div className="px-[3%] mt-6 md:flex gap-5 ">
                <div className="flex items-start">
                    <SideBar sidebar='bookings' />
                </div>
                <Bookings />
            </div>
        </>

    )
}

export default BookingsPage;
import OwnerNavbar from "../../components/navbar/OwnerNavbar";
import BookingRequests from "../../components/owner/BookingRequests";
import SideBar from "../../components/owner/SideBar";

function BookingRequestPage() {
    return (
        <>
            <OwnerNavbar />
            <div className="px-[3%] mt-6 md:flex gap-5">
                <div className="flex items-start">
                    <SideBar sidebar='booking_requests' />
                </div>
                <BookingRequests />
            </div>
        </>

    )
}

export default BookingRequestPage;
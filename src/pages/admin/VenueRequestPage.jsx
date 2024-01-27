import AdminNavbar from "../../components/navbar/AdminNavbar";
import AllVenueRequests from "../../components/admin/AllVenueRequests";

function VenueRequestPage() {
    return (

        <>
            <AdminNavbar page='venue_requests' />

            <AllVenueRequests/>
        </>
    )
}

export default VenueRequestPage;
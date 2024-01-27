import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl";

function SideBar(props) {

    const ownerVenue = useSelector(state => state.ownerTurf)

    console.log(ownerVenue.venue, 'side bar')
    return (
        <>
            {
                ownerVenue ?
                    <div className="border p-3 w-[25vw] ">
                        < div className="flex flex-col items-center gap- border-b-2 py-3" >
                            <div>
                                <img className="rounded-full object-cover h-[12vh] w-[12vh]" src={ownerVenue ? `${ImageUrl}${ownerVenue.venue.venue_images[0]['image']}` : ''} alt="" />
                            </div>
                            <div className="flex flex-col items-center">
                                <h1 className="font-semibold">{ownerVenue.venue.venue_name}</h1>
                                <p className="text-sm">{ownerVenue.venue.place},{ownerVenue.venue.city}</p>
                            </div>
                        </div >

                        <div className="flex flex-col space-y-5 mb-5 mt-5 items-center font-semibold">
                            <div>
                                <Link to='/owner/dashboard'><p className={props.sidebar == 'dashboard' ? 'underline' : ''}>Dashboard</p></Link>
                            </div>

                            <div>
                                <Link to='/owner/booking_requests'><p className={props.sidebar == 'booking_requests' ? 'underline' : ''}>booking requests</p></Link>
                            </div>
                            <div>
                            <Link to='/owner/bookings'><p className={props.sidebar == 'bookings' ? 'underline' : ''}>all bookings</p></Link>

                            </div>
                            <div>
                                edit venue
                            </div>
                            <div>
                                edit profile
                            </div>
                        </div>
                    </div >
                    : <div></div>
            }
        </>
    )
}

export default SideBar;
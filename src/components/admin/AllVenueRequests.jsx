import axios from "axios";
import { useEffect, useState } from "react";
import { BiFootball } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import { MdOutlineTimer } from "react-icons/md";
import ViewVenueRequest from "../../pages/admin/manage_venue_requests/ViewVenueRequest";
import querystring from 'query-string'
import { useNavigate } from "react-router-dom";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

function AllVenueRequests() {

    const [allVenues, setAllVenues] = useState([])
    const adminJwt = Cookies.get('adminjwt')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${BaseUrl}app_admin/requested_venues`, {
            headers: {
                'Authorization': adminJwt
            }
        })
            .then((response) => {
                console.log(response)
                setAllVenues(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const ViewVenueDetails = (id) => {
        const data = {
            venue_id: id
        }

        const queryStringData = querystring.stringify(data)
        navigate(`/admin/view_venue_request?${queryStringData}`)
    }


    return (
        <>
            <div className="px-4 py-4 md:px-[3%]">
                {allVenues.map((venue, index) => (
                    <div key={index} className="border grid grid-cols-12 p-3 sm:px-5 pr-4 items-center rounded-md shadow-md mb-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-center col-span-6">
                            <div className="mb-3 w-[80%] md:w-[35%] sm:mb-0">
                                <img style={{ aspectRatio: '16/11' }} className=" h-[140px] rounded-md" src={`${ImageUrl}${venue.venue_images[0]['image']}`} alt="" />
                            </div>
                            <div className="flex flex-col md:gap-2 items-start">
                                <div className="flex md:gap-3 items-center md:mb-1">
                                    <BiFootball color="green" size={20} />
                                    <h3 className="text-xl font-bold">{venue.venue_name}</h3>
                                </div>
                                <div className="flex md:gap-3 items-center md:mb-1">
                                    <IoLocationSharp color="green" size={20} />
                                    <h3 className="text-sm font-bold">{venue.place}, {venue.city}</h3>
                                </div>
                                <div className="flex md:gap-3 items-center">
                                    <MdOutlineDateRange color="green" size={20} />
                                    <h3 className="text-sm font-bold">{venue.created_at}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-8 sm:col-span-4 mt-4 sm:mt-0">
                            {venue.venue_status && (
                                <div className="flex items-center">
                                    <h1 className={`font-semibold ${venue.venue_status === 'requested' ? 'text-yellow-700' : ''}`}>
                                        {venue.venue_status}
                                    </h1>
                                    {venue.venue_status === 'requested' && <MdOutlineTimer color="green" />}
                                    {venue.venue_status === 'accepted' && <IoCheckmarkDoneCircle color="green" size={23} />}
                                    {venue.venue_status === 'rejected' && <MdCancel color="red" />}
                                </div>
                            )}
                        </div>

                        <div className="col-span-4 sm:col-span-1 mt-4 sm:mt-0">
                            <button onClick={() => ViewVenueDetails(venue.id)} className="green_btn font-semibold shadow-sm w-full sm:w-auto">
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}

export default AllVenueRequests
import axios from "axios";
import { useEffect, useState } from "react";
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { MdAccessTime } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import AlertModalVenueRequest from "../popup_modal/AlertModalVenueRequest";
import { IoCafeOutline } from "react-icons/io5";
import { FaChartSimple } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";

function RequestedVenueDetails(props) {
    const location = useLocation()
    const queryParams = queryString.parse(location.search)
    const { venue_id } = queryParams
    const [venue, setVenue] = useState(null)
    const [venueFacilities, setVenueFacilities] = useState([])
    const [venuePrices, setVenuePrices] = useState([])
    const [venueImages, setvenueImages] = useState([])

    useEffect(() => {
        axios.post(`${BaseUrl}app_admin/view_requested_venue`, {
            venue_id: venue_id
        })
            .then((response) => {
                setVenue(response.data)
                console.log(response.data)
                setVenueFacilities(response.data.venue_facilities)
                setVenuePrices(response.data.venue_prices)
                setvenueImages(response.data.venue_images)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            {venue ?
                <div className="h-screen px-[3%] py-4 mb-5">
                    <div className="grid md:grid-cols-2 gap-2">

                        {/* section 1 */}
                        <div className=" h-[90%]">
                            <div className="rounded p-3 mb-4 bg-[#F8F8F8]">
                                <h2 className="text-lg font-semibold">owner details:</h2>
                                <div className="pl-5">
                                    <p className="font-semibold"> owner name : {venue.owner_details['owner_name']}</p>
                                    <p className="font-semibold"> owner email : <span className="underline">{venue.owner_details['owner_email']}</span></p>
                                </div>
                            </div>

                            <div className="rounded p-3 mb-4 bg-[#F8F8F8]">
                                <h2 className="text-md font-semibold text-lg">venue details:</h2>
                                <div className="pl-5">
                                    <p>venue name : {venue.venue_name}</p>
                                    <p>place : {venue.place}</p>
                                    <p>city : {venue.city}</p>
                                    <p>state : {venue.state}</p>
                                </div>
                            </div>

                            <div className="rounded p-3 mb-4 bg-[#F8F8F8]">
                                <h2 className="text-lg font-semibold flex items-center mb-2 gap-2"><IoCafeOutline size={20} /> facilities</h2>
                                <div className="pl-5 flex gap-1">
                                    {
                                        venueFacilities.map((facility, index) => (

                                            <div className="border border-gray-300 rounded-sm py-1 px-1">
                                                {facility['facility']}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>


                        </div>

                        {/* section 2 */}
                        <div className=" mb-0 h-[90%]">
                            <div className="rounded p-3 mb-4 bg-[#F8F8F8]">
                                <h2 className="text-lg font-semibold flex items-center gap-2"><MdAccessTime size={20} /> timing</h2>
                                <div className="pl-5">
                                    <p className="">{venue.opening_time} - {venue.closing_time}</p>
                                </div>
                            </div>

                            <div className="rounded p-3 mb-2 bg-[#F8F8F8]">
                                <h2 className="text-lg font-semibold flex items-center gap-2"><IoLocationSharp size={20} /> location</h2>
                                <div className="pl-5">
                                    <a onClick={() => window.open(venue.location)} className="text-blue-700 cursor-pointer">{venue.location}</a>
                                </div>
                            </div>

                            <div className="rounded p-3 mb-1 bg-[#F8F8F8]">
                                <h2 className="text-lg font-semibold flex items-center gap-2"><MdMessage /> about</h2>
                                <div className="pl-5">
                                    <textarea className="bg-[#F8F8F8]" cols="30" rows="6" value={venue.about_venue}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* prices  */}
                    <div className="rounded p-3 mb-4 bg-[#F8F8F8]">
                        <h2 className="text-lg font-semibold flex items-center mb-2 gap-2"><FaChartSimple size={20} />price chart</h2>
                        <div className="pl-5 flex flex-col gap-3 ">
                            {
                                venuePrices.map((venue, index) => (
                                    <div className="flex gap-2">
                                        <div className="border border-gray-300 rounded-sm py-1 px-1 flex gap-3">
                                            <div>side : {venue['side']}</div>
                                        </div>
                                        <div className="border border-gray-300 rounded-sm py-1 px-1 flex gap-3">
                                            <div>day price : ₹{venue['day_price']}</div>
                                        </div>
                                        <div className="border border-gray-300 rounded-sm py-1 px-1 flex gap-3">
                                            <div>night price : ₹{venue['night_price']}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* images  */}
                    <div className="pb-5">
                        <h2 className="text-lg font-semibold flex items-center mb-2 gap-2"><IoMdImages size={20} />images</h2>
                        <div className="mt-5 grid md:grid-cols-6 grid-cols-2 gap-3 mb-10 pl-3" >
                            {venueImages.map((venue, index) => (
                            
                                <div key={index}>
                                    <img
                                        style={{ aspectRatio: '16/11' }}
                                        key={index}
                                        src={`${ImageUrl}${venue['image']}`}
                                        alt={`Selected ${index + 1}`}
                                    />
                                    <br />
                                    
                                </div>
                                
                            ))}
                            

                            <div className="text-center">
                                <p className="text-lg ">{venueImages.length == 0 ? 'NO IMAGES ADDED' : ''}</p>
                            </div>
                        </div>
                    </div>


                    {
                        venue.venue_status == 'requested' ?
                            <div className="flex justify-center pb-10 ">
                                <button className="green_btn bg-red-600 rounded-none w-[220px]"><AlertModalVenueRequest type='decline' venue_id={venue_id} /></button>
                                <button className="green_btn rounded-none w-[220px]"><AlertModalVenueRequest type='accept' /></button>
                            </div>
                            : venue.venue_status == 'accepted' ?

                                <div className="flex justify-center pb-10">
                                    <p className="text-lg font-bold text-green-700">this venue request is accepted!</p>
                                </div>

                                : venue.venue_status == 'rejected' ?
                                    <div className="flex justify-center pb-10">
                                        <p className="text-lg font-bold text-red-500">this venue request is rejected!</p>
                                    </div>

                                    :
                                    <div></div>
                    }
                </div>

                : ''
            }
        </>
    )



}

export default RequestedVenueDetails;
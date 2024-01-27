import axios from "axios";
import { useEffect, useState } from "react";
import { BiFootball } from "react-icons/bi";
import { MdOutlineDateRange } from "react-icons/md";
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import { BsCash } from "react-icons/bs";
import { BsBank } from "react-icons/bs";
import { GiDuration } from "react-icons/gi";
import { requested, accepted, rejected, cancelled } from "../../constant/BookingStatusChoices";
import { IoMdDoneAll, IoMdRefresh } from "react-icons/io";
import { MdNotInterested } from "react-icons/md";
import ModalBookingRequests from "../popup_modal/ModalBookingRequests";
import { format } from "date-fns";
import toast from "react-hot-toast";

function BookingRequests() {

    const [allBookingRequests, setBookingRequests] = useState([])
    const [updatedBookings, setupdateBookings] = useState(false)
    const navigate = useNavigate()
    const errorNotification = (message) => toast.error(message)

    useEffect(() => {
        const ownerJwt = Cookies.get('ownerJwt')
        axios.get(`${BaseUrl}owner/bookings/requests`, {
            headers: {
                'Authorization': ownerJwt
            }
        })
            .then((response) => {
                console.log(response)
                setBookingRequests(response.data)
            })
            .catch((error) => {
                console.log(error.response.status)
                if (error.status == 500) {
                    navigate('/owner/login')
                }
            })
    }, [updatedBookings])

    const updateBookings = () => {
        setupdateBookings(!updatedBookings)
    }


    return (
        <div className="w-full  h-[100%] p-5">
            <div className="flex justify-between mb-5">
                <h1 className="text-xl font-semibold">all requests</h1>
                <div><IoMdRefresh className="cursor-pointer" onClick={() => setupdateBookings(!updatedBookings)} /></div>
            </div>

            {allBookingRequests.length > 0 ? allBookingRequests.map((booking, index) => (

                <div>
                    <div className="flex justify-between px-1">
                        <p className="text-sm font-semibold mb-2 md:mb-0">{format(new Date(booking.created_at), 'dd-MM-yyyy')}</p>
                        <p className="text-sm font-semibold flex items-center "> <IoTimeOutline color="green" />{format(new Date(booking.created_at), 'HH:mm')}</p>
                    </div>

                    <div key={index} className="border grid grid-cols-12 p-3 pl-2 md:pl-5 pr-2 md:pr-12 items-center rounded-md shadow-sm mb-4">
                        <div className="flex  md:flex-row gap-4 items-center col-span-12 md:col-span-5">
                            <div className="flex flex-col justify-center items-center space-y-2">
                                {
                                    booking.user['profile_img'] ?
                                        <img style={{ objectFit: 'cover' }} className="h-[90px] w-[90px] md:h-[80px] md:w-[80px] rounded-full" src={`${ImageUrl}${booking.user['profile_img']}`} alt="" />
                                        :
                                        <img style={{ objectFit: "cover" }} className="h-[80px] w-[80px] md:h-[70px] md:w-[70px] rounded-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUvSN8kFRl3ADkH6SYy3c3utUKrdNH5Z-Ew&usqp=CAU' alt="" />
                                }
                                <h3 className="font-semibold">{booking.user['player_username']}</h3>
                            </div>
                            <div className="md:ml-4">
                                <div className="flex gap-3 items-center mb-1">
                                    <MdOutlineDateRange color="green" size={20} />
                                    <h3 className="font-semibold">{booking.date}</h3>
                                </div>
                                <div className="flex gap-3 items-center mb-1">
                                    <IoTimeOutline color="green" size={20} />
                                    <h3 className="text-sm font-bold">{booking.time}</h3>
                                </div>
                                <div className="flex gap-3 mb-1 items-center">
                                    <BiFootball color="green" size={20} />
                                    <h3 className="text-sm font-bold">{booking.court}</h3>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <GiDuration color="green" size={20} />
                                    <h3 className="text-sm font-bold">{booking.duration} hour</h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-5 mt-4 md:mt-0">
                            {
                                <>
                                    <div className="flex flex-col items-center mb-1">
                                        {
                                            <>
                                                <div>
                                                    <p>₹{booking.total_price}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm">payment status : {booking.payment_status ? 'paid' : 'not paid'}</p>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </>
                            }
                        </div>
                        <div className="col-span-12 md:col-span-2 mt-4 md:mt-0 flex flex-col md:flex-row gap-2">
                            {
                                booking.booking_status === 'requested' ?
                                    <div className="md:flex md:flex-row text-center flex-col space-x-2">
                                        <button className="bg-[#d42222d2] px-4 text-white py-2 text-sm rounded-sm  shadow-sm mb-2 md:mb-0">
                                            <ModalBookingRequests booking_id={booking.id} updateBookings={updateBookings} />
                                        </button>
                                        <button className="bg-[#4caf50] px-4 text-white py-2 text-sm rounded-sm  shadow-sm">
                                            <ModalBookingRequests type='accept' venue_id={booking.venue_id} booking_id={booking.id} court={booking.court} date={booking.date} time={booking.time} updateBookings={updateBookings} />
                                        </button>
                                    </div> : booking.booking_status === 'accepted' ?
                                        <>
                                            {
                                                booking.payment_status ?
                                                    <p className="font-semibold text-green-500 flex justify-center gap-1 items-center"><IoMdDoneAll />booked</p>
                                                    :
                                                    <p className="font-semibold text-green-500 flex justify-center gap-1 items-center"><IoMdDoneAll />{booking.booking_status}</p>
                                            }
                                        </>
                                        : booking.booking_status === 'rejected' ?
                                            <p className="font-semibold text-red-500 justify-center flex gap-1 items-center"><MdNotInterested />{booking.booking_status}</p>
                                            : booking.booking_status === 'cancelled' ?
                                                <p className="font-semibold text-red-500 justify-center flex gap-1 items-center"><MdNotInterested />{booking.booking_status}</p>
                                                :
                                                <div></div>
                            }
                        </div>
                    </div>
                </div>

            )) :
                <div>no booking requests</div>

            }


        </div>
    )
}

export default BookingRequests;
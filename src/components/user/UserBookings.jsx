import axios from "axios";
import { useEffect, useState } from "react";
import { BiFootball } from "react-icons/bi";
import { MdOutlineDateRange } from "react-icons/md";
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import { BsCash } from "react-icons/bs";
import { BsBank } from "react-icons/bs";
import { GiDuration } from "react-icons/gi";
import { TbSoccerField } from "react-icons/tb";
import { accepted, rejected, requested, cancelled } from "../../constant/BookingStatusChoices";
import ConfirmModal from "../popup_modal/ConfirmModal";
import RazorpayPage from "./RazorpayPage";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdRefresh } from "react-icons/io";
import userAxiosInstance from "../../instance/axios/UserAxiosInstance";
import { getbookings } from "../../instance/endpoints/user/userEndpoints";
import { format } from 'date-fns'
import CreateActivityModal from "../popup_modal/CreateActivityModal";
import BookingCardSkeleton from "../loader/BookingCardSkeleton";

function UserBookings() {
    const [allBookings, setBookings] = useState([])
    const [updatedBookings, setupdateBookings] = useState(false)
    const [loadSkeleton, setLoadSkeleton] = useState(false)
    const navigate = useNavigate()
    const [confirm, setConfirm] = useState(false)

    useEffect(() => {
        const jwt = Cookies.get('jwt')
        setLoadSkeleton(true)
        axios.get(`${BaseUrl}${getbookings}`, {
            headers: {
                Authorization: jwt
            }
        })
            .then((response) => {
                console.log(response)
                setBookings(response.data)
            })
            .catch((error) => {
                console.log(error)
                if (error.status == 500) {
                    navigate('/login')
                }
            })
            .finally(() => {
                setLoadSkeleton(false)
            })
    }, [updatedBookings])

    const handleCancelBooking = (booking_id) => {
        const jwt = Cookies.get('jwt')
        axios.post(`${BaseUrl}user/booking/cancel`, { booking_id: booking_id }, {
            headers: {
                Authorization: jwt
            }
        })
            .then((response) => {
                console.log(response)
                setupdateBookings(!updatedBookings)
            })
            .catch((response) => {
                console.log(response)
                setupdateBookings(!updatedBookings)
            })
    }

    const handleConfirm = (booking_id) => {
        handleCancelBooking()
    }

    return (
        <>
            {
                !loadSkeleton ?

                    <div className="w-full  h-[100%] md:p-2">
                        <div className="flex justify-between">
                            <h1 className="text-xl pl-1 font-semibold">Bookings</h1>
                            <div><IoMdRefresh className="cursor-pointer" onClick={() => setupdateBookings(!updatedBookings)} /></div>
                        </div>
                        <div className="px-2 py-4">

                            {allBookings ? allBookings.map((booking, index) => (

                                <div key={index} className="mb-3">
                                    <div className="flex justify-between px-1">
                                        <p className="text-sm font-semibold mb-2 md:mb-0">{format(new Date(booking.created_at), 'dd-MM-yyyy')}</p>
                                        <p className="text-sm font-semibold flex items-center "> <IoTimeOutline color="green" />{format(new Date(booking.created_at), 'HH:mm')}</p>
                                    </div>

                                    <div className="border relative grid grid-cols-12 p-3 pl-2 md:pl-5 pr-2 md:pr-12 items-center rounded-md shadow-sm ">
                                        {/* create public game  */}
                                        {
                                            booking.booking_status === 'accepted' && booking.payment_status === true &&
                                            <p className="absolute cursor-pointer top-1 right-2 text-xs font-semibold"><CreateActivityModal booking={booking} /></p>
                                        }
                                        <div className="flex md:flex-row gap-4 items-center col-span-12 mt-3 md:col-span-6">
                                            <div className="flex flex-col justify-center items-center space-y-2">
                                                {
                                                    booking.venue ?
                                                        <Link to={`/venue_details?venue_id=${booking.venue_id}`}>
                                                            <img style={{ aspectRatio: '16/11' }} className="h-[115px] md:h-[120px] rounded-md" src={`${ImageUrl}${booking.venue.venue_images[0]['image']}`} alt="no image" />
                                                        </Link>
                                                        :
                                                        <img style={{ aspectRatio: '16/11' }} className="h-[115px] md:h-[80px]" src='https://t4.ftcdn.net/jpg/05/97/47/95/240_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg' alt="" />
                                                }
                                            </div>
                                            <div className="md:ml-4">
                                                <div className="flex gap-3 items-center mb-1">
                                                    <TbSoccerField color="green" size={20} />
                                                    <Link to={`/venue_details?venue_id=${booking.venue_id}`}>
                                                        <h3 className="font-semibold">{booking.venue.venue_name}</h3>
                                                    </Link>
                                                </div>
                                                <div className="flex gap-3 items-center mb-1">
                                                    <MdOutlineDateRange color="green" size={20} />
                                                    <h3 className="text-sm font-semibold">{booking.date}</h3>
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
                                        <div className="col-span-12 md:col-span-4 mt-4 md:mt-0">
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
                                        <div className="col-span-12 text-center md:col-span-2 mt-4 md:mt-0 flex flex-col md:flex-row gap-2">
                                            {
                                                booking.booking_status === 'requested' ?
                                                    <button className="px-2 ml-5 text-white py-2 text-sm rounded-sm bg-red-500"> <ConfirmModal confirm={() => handleConfirm(handleCancelBooking(booking.id))} btnText='cancel request' /></button>
                                                    : booking.booking_status === 'accepted' ?
                                                        <div className="flex gap-1 flex-col">
                                                            {!booking.payment_status ?
                                                                <>
                                                                    <div className="pl-2 md:pl-5 flex flex-col gap-1">
                                                                        <button className="px-2 text-white font-semibold py-2 text-sm rounded-sm bg-green-500">
                                                                            <RazorpayPage booking_id={booking.id} updateBookings={() => setupdateBookings(!updatedBookings)} total_price={booking.total_price} user={booking.user} />
                                                                        </button>
                                                                        <button className="px-2 text-white whitespace-nowrap py-2 text-sm rounded-sm bg-red-500"> <ConfirmModal confirm={() => handleConfirm(handleCancelBooking(booking.id))} btnText='cancel booking' /></button>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <p className='text-green-400 pl-2 md:pl-5'>Booked</p>
                                                                </>
                                                            }
                                                        </div>
                                                        : booking.booking_status === 'rejected' ?
                                                            <p className={`${booking.booking_status === 'rejected' ? 'text-red-500' : ''} pl-2 md:pl-5`}>{booking.booking_status}</p>
                                                            : booking.booking_status === 'cancelled' ?
                                                                <p className={`${booking.booking_status === 'cancelled' ? 'text-red-500' : ''} pl-2 md:pl-5 text-center`}>{booking.booking_status}</p>
                                                                :
                                                                <p></p>
                                            }
                                        </div>
                                    </div>
                                </div>



                            )) : ''}

                        </div>
                    </div>
                    :
                    <div className="p-5">
                        <div className="flex mb-5 justify-between">
                            <h1 className="text-xl font-semibold">Bookings</h1>
                            <div><IoMdRefresh className="cursor-pointer" onClick={() => setupdateBookings(!updatedBookings)} /></div>
                        </div>
                        <BookingCardSkeleton />
                        <BookingCardSkeleton />
                        <BookingCardSkeleton />
                    </div>
            }
        </>
    )
}

export default UserBookings;
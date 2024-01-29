import axios from "axios";
import { useEffect, useState } from "react";
import { BaseUrl } from "../../constant/BaseUrl";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { MdAccessTime, MdSportsScore } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { GiDuration } from "react-icons/gi";
import { MdOutlinePayment } from "react-icons/md";
import Cookies from "js-cookie";
import ButtonLoader from "../loader/ButtonLoader";
import toast, { Toaster } from 'react-hot-toast';
import { userLogout } from "../../redux/action/userAuthAction";
import { useDispatch } from "react-redux";
import { backgoundImage } from "../../constant_data/BackgroundImage";


function VenueCheckout(props) {
    const location = useLocation()
    const queryParams = queryString.parse(location.search)
    const { venue_id } = queryParams
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [venue, setVenue] = useState(null)
    const [venuePrices, setVenuePrices] = useState(props.prices)
    const [btnLoader, setBtnLoader] = useState(false)
    const [error, setError] = useState('')

    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState('');
    const currentHour = new Date().getHours()
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedCourt, setSelectedCourt] = useState(null)
    const [pricePerHour, setPriceHour] = useState(null)
    const [selectedDuration, setSelectedDuration] = useState(1)
    const [totalPrice, setTotalPrice] = useState(null)
    const errorNotification = (message) => toast.error(message);

    useEffect(() => {
        axios.post(`${BaseUrl}venue/venue_details`, {
            venue_id: venue_id
        })
            .then((response) => {
                setVenue(response.data)
                console.log(response.data)
                setVenuePrices(response.data.venue_prices)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleVenueBook = () => {
        if (venue && selectedCourt && selectedDate && selectedDay && selectedDuration) {
            setBtnLoader(true)
            const jwttoken = Cookies.get('jwt')

            if (!jwttoken) {
                errorNotification('please login to book the slot')
                navigate('/login')
            }

            const currentDateTime = new Date()
            const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);

            if (selectedDateTime < currentDateTime) {
                errorNotification("can't book on selected date and time")
                setBtnLoader(false)
                return
            }

            axios.post(`${BaseUrl}venue/book_venue`, {
                venue_id: venue_id,
                court: selectedCourt,
                date: selectedDate,
                time: selectedTime,
                duration: selectedDuration,
                price_per_hour: pricePerHour,
                total_price: totalPrice
            },
                {
                    headers: {
                        Authorization: `${jwttoken}`
                    }
                })
                .then((response) => {
                    console.log(response)
                    navigate('/booking_requested')
                })
                .catch((error) => {
                    console.log(error)
                    if (error.response.status == 406) {
                        errorNotification('slot already booked')
                    }
                    if (error.response.status == 401) {
                        errorNotification('login expired')
                        dispatch(userLogout(null))
                        navigate('/login')
                    }

                })
                .finally(() => {
                    setBtnLoader(false)
                })
        } else {
            errorNotification('please fill the blanks')
        }
    }

    const handleTimeChange = (event) => {
        const selectedHour = event.target.value.split(':')[0];
        setSelectedTime(`${selectedHour}:00`);

        if (selectedCourt) {
            venuePrices.map((venue, index) => {
                if (venue.side == selectedCourt) {
                    if (selectedHour >= '18:00') {
                        setPriceHour(venue.night_price)
                    }
                    else {
                        setPriceHour(venue.day_price)
                    }
                }
            })
        }

        const price = pricePerHour * selectedDuration
        setTotalPrice(price)
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        const dateObject = new Date(event.target.value);
        const options = { weekday: 'long' };
        const dayOfWeek = dateObject.toLocaleDateString('en-US', options);
        setSelectedDay(dayOfWeek);
    };

    const handleSelectVenue = (e) => {
        setSelectedCourt(e.target.value)

        venuePrices.map((venue, index) => {
            if (venue.side == e.target.value) {
                if (selectedTime >= '18:00') {
                    setPriceHour(venue.night_price)
                }
                else {
                    setPriceHour(venue.day_price)
                }
            }
        })
        setTotalPrice(pricePerHour * selectedDuration)
    }

    const handleDurationPrice = (e) => {
        setSelectedDuration(e.target.value)
        setTotalPrice(pricePerHour * e.target.value)
    }

    const handlePaymentMethod = (e) => {
        setpaymentMethod(e.target.value);
    };

    return (
        <>
            {venue ? (
                <div style={backgoundImage} className="w-full pb-[10vh] px-[3%] py-4 mb-5">

                    {/* slot booking */}
                    <div className="rounded p-3 bg-[#F8F8F8]" id="book_now">
                        <h1 className="text-xl font-semibold">BOOK YOUR SLOT</h1>

                        <div className="mt-4  grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="py-2 ">

                                <div className="bg-white shadow px-5 pb-8 rounded-md py-2">
                                    {/* aside */}
                                    <div>
                                        <label htmlFor="side" className="mb-2 text-sm font-semibold">Select side</label>
                                        <select onChange={(e) => handleSelectVenue(e)} id="side" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
                                            <option value={''}>select court</option>
                                            {venuePrices.map((venue, index) => (
                                                <option key={index} value={venue.side}>{venue.side}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:gap-10">
                                        <div className="w-full">
                                            <h1 className="mb-2 text-sm font-semibold mt-2">date</h1>
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                min={today}
                                                type="date"
                                            />
                                        </div>

                                        <div className="w-full">
                                            <h1 className="mb-2 text-sm font-semibold mt-2">time</h1>
                                            <input
                                                type="time"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                                value={selectedTime}
                                                onChange={handleTimeChange}
                                                step="3600"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h1 className="mb-2 text-sm font-semibold mt-2">duration</h1>
                                        <select
                                            disabled={!selectedCourt || !selectedTime}
                                            onChange={(e) => handleDurationPrice(e)}
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 `}
                                            name=""
                                            id=""
                                        >
                                            <option selected value={1}>1 hour</option>
                                            <option value={2}>2 hour</option>
                                            <option value={3}>3 hour</option>
                                            <option value={4}>4 hour</option>
                                        </select>
                                    </div>

                                    <div>
                                        <h1 className="mb-2 text-sm font-semibold mt-2">price chart</h1>

                                        <div className="relative overflow-x-auto">
                                            <table className="w-full text-sm border text-left rtl:text-right text-gray-500">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                    <tr className="border">
                                                        <th scope="col" className="px-6 py-3">
                                                            court
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            day price
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            night price
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {venuePrices.map((venue, index) => (
                                                        <tr key={index} className="bg-white border-b">
                                                            <th scope="row" className="md:px-6 px-2 py-2 md-2 md:py-2 font-medium">
                                                                {venue.side}
                                                            </th>
                                                            <td className="md:px-6 px-2 md-2 md:py-2">
                                                                ₹{venue.day_price}
                                                            </td>
                                                            <td className="md:px-6 px-2 md-2 md:py-2">
                                                                ₹{venue.night_price}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* checkout */}
                            <div className="py-2">
                                <div className="bg-white md:px-5 px-3 rounded-md py-3 shadow">

                                    <div className="border-b-2 mb-5">
                                        <h2 className="font-semibold">checkout</h2>
                                    </div>

                                    <div className="mb-2 font-semibold flex  justify-between">
                                        <p className="flex items-center gap-1"><MdOutlineDateRange /> date</p>
                                        <p>{selectedDate} {selectedDay}</p>
                                    </div>
                                    <div className="mb-2 font-semibold flex  justify-between">
                                        <p className="flex items-center gap-1"><MdAccessTime /> time</p>
                                        <p>{selectedTime} (IST)</p>
                                    </div>
                                    <div className="mb-2 font-semibold flex  justify-between">
                                        <p className="flex items-center gap-1"><MdSportsScore /> court</p>
                                        <p>{selectedCourt ? selectedCourt : 'not selected'}</p>
                                    </div>
                                    <div className="mb-2 font-semibold flex  justify-between">
                                        <p className="flex items-center gap-1"><LiaRupeeSignSolid /> price/hour</p>
                                        <p>{pricePerHour ? `₹${pricePerHour}` : '₹0'}</p>
                                    </div>
                                    <div className="mb-2 font-semibold flex  justify-between">
                                        <p className="flex items-center gap-1"><GiDuration /> duration</p>
                                        <p>{selectedDuration ? `${selectedDuration} hour` : ''} </p>
                                    </div>

                                    <hr />

                                    <div className="mt-3 font-semibold flex  sm:flex-row justify-between">
                                        <p className="flex items-center gap-1"><LiaRupeeSignSolid /> total</p>
                                        <p>{totalPrice ? `₹${pricePerHour * selectedDuration}.00` : '₹0'}</p>
                                    </div>

                                    <div className="mt-5 flex justify-center pl-2">
                                        {!btnLoader ? (
                                            <button onClick={handleVenueBook} className="green_btn w-full rounded-sm font-semibold shadow-none">
                                                BOOK SLOT
                                            </button>
                                        ) : (
                                            <button className="w-full flex justify-center px-4 py-4 tracking-wide text-white transition-colors duration-200 transform bg-[#4caf50] rounded-sm">
                                                <ButtonLoader />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : ''}
        </>

    )



}

export default VenueCheckout;
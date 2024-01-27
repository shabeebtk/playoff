import axios from "axios";
import { useEffect, useState } from "react";
import { BaseUrl, ImageUrl } from "../../constant/BaseUrl";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { MdAccessTime } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { CiCircleChevRight } from "react-icons/ci";
import { CiCircleChevLeft } from "react-icons/ci";
import { FaTreeCity } from "react-icons/fa6";
import { BiSolidCalendarStar } from "react-icons/bi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link, animateScroll as scroll } from 'react-scroll';
import { MdOutlineDateRange } from "react-icons/md";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoArrowBack } from "react-icons/io5";

function VenueDetails(props) {
    const location = useLocation()
    const queryParams = queryString.parse(location.search)
    const { venue_id } = queryParams
    const [venue, setVenue] = useState(null)
    const [venueFacilities, setVenueFacilities] = useState([])
    const [venuePrices, setVenuePrices] = useState([])
    const [venueImages, setvenueImages] = useState([])
    const currentDate = new Date().toISOString().slice(0, 16);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        axios.post(`${BaseUrl}venue/venue_details`, {
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


    const handlePrevClick = () => {
        console.log(currentSlide, 'prev')
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? venueImages.length : prevSlide - 1));
    };

    const handleNextClick = () => {
        console.log(currentSlide, 'next')
        setCurrentSlide((prevSlide) => (prevSlide === venueImages.length ? 0 : prevSlide + 1));
    };

    const handleIndicatorClick = (index) => {
        console.log(index, 'index')
        setCurrentSlide(index);
    };

    console.log(venueImages.length)

    return (
        <>
            {venue ?
                <div className="w-full px-[3%] py-4">
                    <div className="flex justify-between">
                        <h1 className="md:text-3xl sm:text-sm font-bold mb-2">{venue.venue_name}</h1>
                        <IoArrowBack className="cursor-pointer" onClick={()=> window.history.back()} size={25} />
                    </div>
                    <div className="md:flex gap-5">
                        {/* heading  */}
                        <div>

                            {/* caroesal  */}
                            <div id="default-carousel" className="relative bg-slate-400 mb-3.5 md:w-[50vw] sm:w-full border rounded-lg" data-carousel="slide">
                                {/* Carousel wrapper */}
                                <div className="relative h-[25vh] overflow-hidden rounded-lg md:h-96">
                                    {/* Carousel items */}
                                    {venueImages.map((venue, index) => (
                                        <div
                                            key={index}
                                            className={`duration-700 ease-in-out${index === currentSlide ? '' : ' opacity-0'}`}
                                            data-carousel-item
                                        >
                                            <img
                                                src={`${ImageUrl}${venue['image']}`}
                                                className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                                alt={`Slide ${venue}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* Slider indicators */}
                                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                                    {venueImages.map((venue, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full${index === currentSlide ? ' bg-blue-500' : ' bg-gray-300'}`}
                                            aria-current={index === currentSlide ? 'true' : 'false'}
                                            aria-label={`Slide ${index}`}
                                            data-carousel-slide-to={index}
                                            onClick={() => handleIndicatorClick(index)}
                                        ></button>
                                    ))}
                                </div>
                                {/* Slider controls */}
                                <button
                                    type="button"
                                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                    data-carousel-prev
                                    onClick={handlePrevClick}
                                >
                                    <CiCircleChevLeft color="white" size={35} />
                                </button>
                                <button
                                    type="button"
                                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                    data-carousel-next
                                    onClick={handleNextClick}
                                >
                                    <CiCircleChevRight color="white" size={35} />
                                </button>
                            </div>

                            {/* ---- */}
                        </div>


                        {/* venue details  */}
                        <div className="w-full">
                            <div className="">
                                <div className="rounded w-full p-3 mb-4 bg-[#F8F8F8]">
                                    <h2 className="md:text-lg  font-semibold flex items-center gap-2"><MdAccessTime className="text-lg" /> timing</h2>
                                    <div className="pl-5">
                                        <p className="">{venue.opening_time.slice(0, 2)}:00 - {venue.closing_time.slice(0, 2)}:00 IST</p>
                                    </div>
                                </div>

                                <div className="rounded p-3 mb-4 bg-[#F8F8F8]">
                                    <h2 className="md:text-lg flex items-center gap-2 font-semibold text-lg"><FaTreeCity className="text-lg" /> address:</h2>
                                    <div className="pl-5">
                                        <p>{venue.venue_name}, {venue.place}</p>
                                        <p>{venue.city},{venue.state}</p>
                                    </div>
                                </div>

                                <div className="rounded p-3 mb-5 bg-[#F8F8F8]">
                                    <h2 className="md:text-lg font-semibold flex items-center gap-2"><IoLocationSharp className="text-lg"  /> location</h2>
                                    <div className="pl-5 pt-3">
                                        <button onClick={() => window.open(venue.location)} className="font-semibold cursor-pointer flex justify-center items-center gap-1 border w-full py-2 border-black">
                                            <FaMapMarkedAlt /> navigate
                                        </button>
                                    </div>
                                </div>

                                <Link to="book_now" smooth={true} duration={500}>
                                    <button className="w-full border bg-[#4caf50] text-white font-semibold py-2  rounded-sm shadow-none ">BOOK NOW</button>
                                </Link>


                            </div>

                        </div>
                    </div>

                    {/* about  */}
                    <div className="rounded p-3 mb-2 bg-[#F8F8F8]">
                        <h2 className="text-lg font-semibold flex items-center gap-2"><MdMessage className="text-lg" /> about</h2>
                        <div className="pl-5">
                            <p className="bg-[#F8F8F8] whitespace-pre-line  w-full h-[15vh]">{venue.about_venue}</p>
                        </div>
                    </div>

                    {/* facilities */}
                    <div className="rounded p-3 bg-[#F8F8F8]">
                        <h2 className="text-lg font-semibold flex items-center mb-5 gap-2"><BiSolidCalendarStar className="text-lg" /> facilities</h2>
                        <div className="pl-5 flex gap-1 mb-2" id="sample">
                            {
                                venueFacilities.map((facility, index) => (

                                    <div key={index} className="border border-gray-300 rounded-sm py-1 px-1">
                                        {facility['facility']}
                                    </div>
                                ))
                            }
                        </div>
                    </div>



                </div>

                : ''
            }
        </>
    )



}

export default VenueDetails;
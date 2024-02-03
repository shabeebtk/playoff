import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { MdPendingActions } from "react-icons/md";
import { Link } from "react-router-dom";
import { backgoundImage } from "../../constant_data/BackgroundImage";

function VenueBookingRequestedPage() {
    return (
        <>
            <Navbar />

            <div style={backgoundImage} className="flex justify-center items-center h-[80vh]">
                <div className="card flex bg-white items-center h-[30vh] justify-center overflow-hidden relative text-left border-radius-[0.5rem] w-[70vh] shadow-md p-5">
                    
                    <div className="header p-1.25rem 1rem h-[30vh]">
                        <div className="image flex justify-center my-3 mx-auto ">
                            <MdPendingActions className="text-center" color="green" size={30} />
                        </div>
                        <div className="content mt-0.75rem text-center">
                            <span className="title text-[#066e29] font-semibold text-xl">
                                slot booking requested
                            </span>
                            <p className="message mt-0.5rem text-[#595b5f] text-[17px] leading-1.25rem">
                                Thank you for booking the slot. Your request will be confirmed soon you will recieve an email.
                            </p>
                           <Link to='/bookings'> <p className="message mt-0.5rem text-[#5e83ce] underline text-[15px] leading-1.25rem">
                                view your bookings
                            </p> </Link>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default VenueBookingRequestedPage;
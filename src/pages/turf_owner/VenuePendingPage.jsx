import React, { useEffect, useState } from "react";
import OwnerNavbar from "../../components/navbar/OwnerNavbar";
import { MdPendingActions } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../../constant/BaseUrl";
import { ownerAddTurf } from "../../redux/action/OwnerTurfAuthAction";
import axios from "axios";

function VenuePendingPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [venue, setVenue] = useState(null)
    const isAuthenticated = useSelector(state => state.ownerAuth.is_authenticated)
    const owner = useSelector(state => state.ownerAuth.owner)
    const ownerVenue = useSelector(state => state.ownerTurf)

    useEffect(() => {
        if (!isAuthenticated || !owner) {
            navigate('/owner/login')
        }
        axios.post(`${BaseUrl}owner/check_venue`, {
            email: owner.owner_email
        })
            .then((response) => {
                const venue = response.data
                setVenue(venue)
                console.log(venue, 'useeffect')
                if (venue.active && venue.venue_status == 'accepted') {
                    dispatch(ownerAddTurf(venue))
                    console.log('venue is active')
                    navigate('/owner/dashboard')
                }
                else if (venue.venue_status == 'requested') {
                    navigate('/owner/venue_requested')
                }
                else if (venue.venue_status == 'rejected') {
                    console.log('venue is rejected')
                }
            })
            .then((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <OwnerNavbar />

            <div className="flex justify-center items-center h-[80vh]">
                <div className="card flex items-center h-[30vh] justify-center overflow-hidden relative text-left border-radius-[0.5rem] w-[70vh] shadow-md bg-white p-5">
                    
                    <div className="header p-1.25rem 1rem h-[30vh]">
                        <div className="image flex justify-center my-3 mx-auto ">
                            <MdPendingActions className="text-center" color="green" size={30} />
                        </div>
                        <div className="content mt-0.75rem text-center">
                            <span className="title text-[#066e29] font-semibold text-xl">
                                venue submited
                            </span>
                            <p className="message mt-0.5rem text-[#595b5f] text-[17px] leading-1.25rem">
                                Thank you for partnering with us. Your venue will be confirmed soon you will recieve an email.
                            </p>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default VenuePendingPage;
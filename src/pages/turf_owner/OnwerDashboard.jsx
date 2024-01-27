import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OwnerNavbar from "../../components/navbar/OwnerNavbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../constant/BaseUrl";
import Dashboard from "../../components/owner/Dashboard";
import { ownerAddTurf } from "../../redux/action/OwnerTurfAuthAction";

function OwnerDashboard() {
    const isAuthenticated = useSelector(state => state.ownerAuth.is_authenticated)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const owner = useSelector(state => state.ownerAuth.owner)
    const [venue, setVenue] = useState(null)
    const ownerVenue = useSelector(state => state.ownerTurf)

    console.log(ownerVenue, 'dashboard page')

    useEffect(() => {
        axios.post(`${BaseUrl}owner/check_venue`, {
            email: owner.owner_email
        })
            .then((response) => {
                const venue = response.data
                setVenue(venue)
                
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


    console.log(ownerVenue)
    return (
        <>
            <OwnerNavbar />
            {venue && venue.active && venue.venue_status == 'accepted' ? <Dashboard /> :

                <div className="flex justify-center items-center  h-[80vh]">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-2xl font-bold">YOUR VENUE IS NOT ADDED</h1>
                        <p className="text-lg">
                            add your venue and get verified
                        </p>
                        <Link to='/owner/add_venue'><p className="text-blue-600 underline">add your venue</p></Link>
                    </div>
                </div>
            }
        </>
    )
}

export default OwnerDashboard;
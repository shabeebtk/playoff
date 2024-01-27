import React, { useEffect } from "react";
import AddVenue from "../../components/owner/AddVenue";
import OwnerNavbar from "../../components/navbar/OwnerNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { BaseUrl } from "../../constant/BaseUrl";


function AddVenuePage(){

    const isAuthenticated = useSelector(state => state.ownerAuth.is_authenticated)
    const navigate = useNavigate()
    const owner = useSelector(state => state.ownerAuth.owner)

    useEffect(()=>{
        if (!isAuthenticated || !owner){
            navigate('/owner/login')
        }

        axios.post(`${BaseUrl}owner/check_venue`, {
            email : owner.owner_email
        })
        .then((response)=>{
            const venue = response.data
            if (venue.active && venue.venue_status == 'accepted'){
                console.log('venue is active')
            }
            else if (venue.venue_status == 'requested'){
                navigate('/owner/venue_requested')
            }
            else if (venue.venue_status == 'rejected'){
                console.log('venue is rejected')
            }
        })
        .then((error)=>{
            console.log(error)
        })
    })

    return(
        <>
            <OwnerNavbar/>
            <AddVenue/>
        </>
    )
}

export default AddVenuePage;
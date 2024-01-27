import React, { useEffect } from "react";
import Banner from "../../components/banners/Banner";
import turf_image1 from '../../assets/images/turf.jpg'
import turf_image2 from '../../assets/images/banner_1.jpg'
import OwnerNavbar from "../../components/navbar/OwnerNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function OwnerHomePage() {

    const isAuthenticated = useSelector(state => state.ownerAuth.is_authenticated)
    const owner = useSelector(state => state.ownerAuth.owner)
    const navigate = useNavigate()

    useEffect(()=>{
        if (isAuthenticated || owner){
            navigate('/owner/dashboard')
        }
    })

    return (

        <>
           <OwnerNavbar/>        
           <Banner background={turf_image1} heading='BOOKINGS' paragraph='get' button='register' />
           <Banner background={turf_image2} heading='VERIFIED' paragraph='submit your venue details and get' button='submit' />
           <Banner background={turf_image1} heading='GET PAID' paragraph='after verification your venue will go live and' button='earn now' />
        </>
    )
}

export default OwnerHomePage;
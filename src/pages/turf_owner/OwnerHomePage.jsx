import React, { useEffect } from "react";
import Banner from "../../components/banners/Banner";
import turf_image1 from '../../assets/images/turf.jpg'
import turf_image2 from '../../assets/images/banner_1.jpg'
import OwnerNavbar from "../../components/navbar/OwnerNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
function OwnerHomePage() {

    const isAuthenticated = useSelector(state => state.ownerAuth.is_authenticated)
    const owner = useSelector(state => state.ownerAuth.owner)
    const navigate = useNavigate()
    const ownerJwt = Cookies.get('ownerJwt')

    useEffect(()=>{
        if (isAuthenticated && owner && ownerJwt){
            navigate('/owner/dashboard')
        }
    })

    return (

        <>
           <OwnerNavbar/>        
           <Banner background={turf_image1} heading='BOOKINGS' linkTo='/owner/login' paragraph='get' button='register' />
           <Banner background={turf_image2} heading='VERIFIED' linkTo='/owner/login' paragraph='submit your venue details and get' button='submit' />
           <Banner background={turf_image1} heading='GET PAID' linkTo='/owner/login' paragraph='after verification your venue will go live and' button='earn now' />
        </>
    )
}

export default OwnerHomePage;
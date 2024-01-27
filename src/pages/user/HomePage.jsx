import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Banner from "../../components/banners/Banner";
import banner_image_1 from '../../assets/images/banner_1.jpg'
import banner_image_2 from '../../assets/images/book_your_venue.webp'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { userLogout } from "../../redux/action/userAuthAction";
import Cookies from "js-cookie";

function HomePage() {

    const isAuthenticated = useSelector(state => state.userAuth.is_authenticated)
    const user = useSelector(state => state.userAuth.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log(user)
    useEffect(() => {
        const userJwt = Cookies.get('jwt')
        if (!userJwt) {
            dispatch(userLogout(null))
            return
        }
        if (user && isAuthenticated) {
            navigate('/venues')
        } else {
            dispatch(userLogout(null))
        }
    }, [])


    return (
        <>
            <Navbar />
            <Banner background={banner_image_1} heading="let's Football" paragraph="hey players," button="LOGIN NOW" linkTo="/login" />
            <Banner background={banner_image_2} heading="Book your venues" paragraph="find the nearest venues, book your slot, and host the game" button="BOOK NOW" linkTo="/venues" />
            <Banner background={banner_image_1} button="PLAY NOW" heading="play with other players" paragraph="join other hosted game meet players and make new friends" linkTo="/games" right={true} />
            <Footer />
        </>
    )
}

export default HomePage;
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import AllActiveVenues from "../../components/user/AllActiveVenues";
import Footer from "../../components/footer/Footer";
function AllVenuesPage() {
    return (
        <>
            <Navbar page='book' />
            <AllActiveVenues/>
            <Footer/>
        </> 
    )
}

export default AllVenuesPage;
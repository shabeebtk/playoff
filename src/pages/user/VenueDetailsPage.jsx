import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import VenueCheckout from "../../components/user/VenueCheckout";
import VenueDetails from "../../components/user/VenueDetails";
import axios from "axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { BaseUrl } from "../../constant/BaseUrl";

function VenueDetailsPage() {
    return (
        <>
            <Navbar page='book' />
            <VenueDetails  />   
            <VenueCheckout  />      
        </>
    )
}

export default VenueDetailsPage;
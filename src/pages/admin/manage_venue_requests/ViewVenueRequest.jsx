import { useLocation } from "react-router-dom";
import AdminNavbar from "../../../components/navbar/AdminNavbar";
import queryString from "query-string";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../../constant/BaseUrl";
import RequestedVenueDetails from "../../../components/admin/RequestedVenueDetails";

function ViewVenueRequest() {

    return (
        <>
            <AdminNavbar page='venue_requests' />
            <RequestedVenueDetails />
        </>
    )
}

export default ViewVenueRequest;
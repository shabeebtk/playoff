import React from "react";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import AllVenuesTable from "../../components/admin/AllVenuesTable";


function ManageVenues() {
    return (
        <>
            <AdminNavbar page='venues' />
            <AllVenuesTable/>
        </>
    )
}

export default ManageVenues;
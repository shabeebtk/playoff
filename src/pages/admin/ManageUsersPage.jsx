import React from "react";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import AllUsersTable from "../../components/admin/AllUsersTable";


function ManageUsersPage() {
    
    return (
        <>
            <AdminNavbar page='users' />
            <AllUsersTable/>

        </>
    )
}

export default ManageUsersPage;
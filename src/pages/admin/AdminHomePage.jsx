import React, { useEffect } from "react";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import axios from "axios";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../../components/admin/AdminDashboard";

function AdminHomePage() {

    const navigate = useNavigate()

    useEffect(()=>{
        const adminJwt = Cookies.get('adminjwt')
        axios.get(`${BaseUrl}app_admin/get_admin`, {
            headers : {
                Authorization : `${adminJwt}`
            }
        })
        .then((response)=>{
            console.log('admin')
        })
        .catch((error)=>{
            console.log(error)
            navigate('/admin/login')
        })
    }, [])

    return (
        <>
            <AdminNavbar page='dashboard' />
            <AdminDashboard/>
        </>
    )
}

export default AdminHomePage;
import React, { useEffect } from "react";
import AdminLogin from "../../components/signin_form/adminLogin";
import { BaseUrl } from "../../constant/BaseUrl";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
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
            navigate('/admin/')
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [])
   
   
    return (
        
        <>
            <AdminLogin />
        </>
    )
}

export default AdminLoginPage;
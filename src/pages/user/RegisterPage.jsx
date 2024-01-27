import React, {useEffect} from "react";
import Register from "../../components/register_form/Register";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

    const isAuthenticated = useSelector(state => state.userAuth.is_authenticated)
    const user = useSelector(state => state.userAuth.user)
    const navigate = useNavigate()

    useEffect(()=>{
        if (user && isAuthenticated){
            navigate('/venues')
        }
    })
    
    return (
        <>
            <Register/>
        </>
    )
}

export default RegisterPage;
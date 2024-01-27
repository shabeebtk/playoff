import Cookies from 'js-cookie';
import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


function OwnerProtectedRouter({ element: Element }) {
    const owner = useSelector((state) => state.ownerAuth.owner);
    const message = (message)=> toast.error(message)
    const ownerJwt = Cookies.get('ownerJwt')
    
    if (!owner || !ownerJwt) {
      return <Navigate to="/owner/login" />;
    }
  
    return <Element />;
  }

export default OwnerProtectedRouter;
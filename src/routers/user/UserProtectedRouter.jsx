import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


function UserProtectedRouter({ element: Element }) {
    const user = useSelector((state) => state.userAuth.user);
    const message = (message)=> toast.error(message)
  
    if (!user) {
      return <Navigate to="/login" />;
    }
  
    return <Element />;
  }

export default UserProtectedRouter;
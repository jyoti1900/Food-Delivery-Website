import React, { useState } from "react";
import { useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AdminOutlet from "../admin/AdminOutlet";
import CustomerOutlet from "../customer/CustomerOutlet";

const RequireAuth = ({ allow_user }) => {
    const { auth } = useAuth();
    const location = useLocation();
    
    return auth?.user_type === allow_user ? (
        <>
            {allow_user === 'admin' ? <AdminOutlet/> : <CustomerOutlet/>}
        </>
    ) : auth?.token ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;

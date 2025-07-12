import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const userDetails = JSON.parse(localStorage.getItem("user_details"));
    
    const [auth, setAuth] = useState(userDetails ? {
        user_type: userDetails.user_type,
        user_details: userDetails,
        token: localStorage.getItem('token')
    }: {});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
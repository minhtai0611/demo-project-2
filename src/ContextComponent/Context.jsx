import { useMutationState } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";
import { StateDataContext } from "../CreateContextComponent/CreateContext";
import { useEffect, useState } from "react";

export function StateDataProvider({ children }) {
    const stateLoginData = useMutationState({
        filters: { mutationKey: ["loginKey"], status: "success" },
        select: ({ state }) => state.data
    });
    const stateLogoutData = useMutationState({
        filters: { mutationKey: ["logoutKey"], status: "success" },
        select: ({ state }) => state.data
    });
    const stateAuthData = stateLoginData.filter(() => stateLoginData[stateLoginData.length - 1]?.data?.loginUser?.userid !== stateLogoutData[stateLogoutData.length - 1]?.data?.logoutUser?.userid);
    console.log(stateAuthData);
    return (
        <StateDataContext.Provider value={stateAuthData}>
            {children}
        </StateDataContext.Provider>
    )
}

export function StateProtectDataProvider({ children }) {
    const stateLoginData = useMutationState({
        filters: { mutationKey: ["loginKey"], status: "success" },
        select: ({ state }) => state.data
    });
    const stateLogoutData = useMutationState({
        filters: { mutationKey: ["logoutKey"], status: "success" },
        select: ({ state }) => state.data
    });
    const stateAuthData = stateLoginData.filter(() => stateLoginData[stateLoginData.length - 1]?.data?.loginUser?.userid !== stateLogoutData[stateLogoutData.length - 1]?.data?.logoutUser?.userid);
    const [navigate, setNavigate] = useState(false);
    const location = useLocation();
    const currentURL = location.pathname;
    useEffect(() => {
        if (stateAuthData.length > 0 && stateAuthData[stateAuthData.length - 1]?.data?.loginUser?.userid && stateAuthData[stateAuthData.length - 1]?.data?.loginUser?.token) {
            if (currentURL === "/login" || currentURL === "/register") {
                const delayTimeout = setTimeout(() => {
                    setNavigate(true);
                }, 7000);
                return () => clearTimeout(delayTimeout);
            }
        }
    });
    if (navigate) {
        return <Navigate to="/" />;
    }
    return children;
}
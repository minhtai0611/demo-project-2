import { useMutationState } from "@tanstack/react-query";
import { StateDataContext } from "../CreateContextComponent/CreateContext";

export function StateDataProvider({ children }) {
    const stateLoginData = useMutationState({
        filters: { mutationKey: ["loginKey"], status: "success" },
        select: ({ state }) => state.data
    });
    const stateLogoutData = useMutationState({
        filters: { mutationKey: ["logoutKey"], status: "success" },
        select: ({ state }) => state.data
    });
    const stateTokenData = useMutationState({
        filters: { mutationKey: ["tokenRefreshKey"], status: "success" },
        select: ({ state }) => state.data
    });
    return (
        <StateDataContext.Provider value={{ stateLoginData, stateLogoutData, stateTokenData }}>
            {children}
        </StateDataContext.Provider>
    )
}
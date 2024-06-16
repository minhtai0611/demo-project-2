import { createContext } from "react";
import { useMutationState } from "@tanstack/react-query";

export const StateDataContext = createContext();

// export const useStateContext = () => useContext(StateDataContext);

export default function StateDataProvider({ children }) {
    const stateLoginData = useMutationState({
        filters: { mutationKey: ["loginKey"], status: "success" },
        select: ({ state }) => state.data
    });
    const stateLogoutData = useMutationState({
        filters: { mutationKey: ["logoutKey"], status: "success" },
        select: ({ state }) => state.data
    });
    const stateAuthData = stateLoginData.filter((loginUser) => stateLoginData[stateLoginData.length - 1]?.data?.loginUser?.userid !== stateLogoutData[stateLogoutData.length - 1]?.data?.logoutUser?.userid);
    console.log(stateAuthData);
    return (
        <StateDataContext.Provider value={stateAuthData}>
            {children}
        </StateDataContext.Provider>
    )
}
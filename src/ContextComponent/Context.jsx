import { createContext } from "react";
import { useMutationState } from "@tanstack/react-query";

export const StateDataContext = createContext();

// export const useStateContext = () => useContext(StateDataContext);

export default function StateDataProvider({ children }) {
    const stateData = useMutationState({
        filters: { mutationKey: ["loginKey"], status: "success" },
        select: ({ state }) => state.data
    });
    return (
        <StateDataContext.Provider value={stateData}>
            {children}
        </StateDataContext.Provider>
    )
}
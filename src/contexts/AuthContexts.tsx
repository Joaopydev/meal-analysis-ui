import { createContext } from "react";

interface IAuthContextValue {
    isLoggedIn: boolean;
    isLoading: boolean;
}

export const AuthContext = createContext({} as IAuthContextValue)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <AuthContext.Provider value={{ isLoggedIn: false, isLoading: false }}>
            {children}
        </AuthContext.Provider>
    )
}
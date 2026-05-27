import { createContext } from "react"
import { type User } from "../../types/User"
import { type SignInParams, type SignUpParams } from "../../types/Auth"

interface IAuthContextValue {
    user: User | null
    isLoggedIn: boolean
    isLoading: boolean
    signIn: (params: SignInParams) => Promise<void>
    signUp: (params: SignUpParams) => Promise<void>
    signOut: () => Promise<void>
}

export const AuthContext = createContext({} as IAuthContextValue)
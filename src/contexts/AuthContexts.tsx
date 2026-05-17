import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

import { httpClient } from "../services/httpClient";
import { isAxiosError } from "axios";

type User = {
    id: number
    name: string
    email: string
    calories: number
    proteins: number
    carbohydrates: number
    fats: number
}

type SignInParams = {
    email: string
    password: string
}

type SignUpParams = {
    goal: string
    gender: string
    birthDate: string
    height: number
    weight: number
    activityLevel: number
    account: {
        name: string,
        email: string,
        password: string,
    }
}

interface IAuthContextValue {
    user: User | null
    isLoggedIn: boolean
    isLoading: boolean
    signIn: (params: SignInParams) => Promise<void>
    signUp: (params: SignUpParams) => Promise<void>
    signOut: () => Promise<void>
}

export const AuthContext = createContext({} as IAuthContextValue)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {

    const TOKEN_STORAGE_KEY = "@auth::user::isLogged"
    const [token, setToken] = useState<string | null>(null)
    const [isLoadingToken, setIsLoadingToken] = useState(true)

    useEffect(() => {
        async function load() {
            const data = await AsyncStorage.getItem(TOKEN_STORAGE_KEY)
            setToken(data)
            setIsLoadingToken(false)
        }
        load()
    }, [])

    useEffect(() => {
        async  function run() {
            if (!token) {
                httpClient.defaults.headers.common["Authorization"] = null
                return
            }
            await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token)
            httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
        run()
    }, [token])

    const { mutateAsync: signIn } = useMutation({
        mutationFn: async (params: SignInParams) => {
            const { data } = await httpClient.post("/signin", params)
            setToken(data.accessToken)
        }
    })
    const { mutateAsync: signUp } = useMutation({
        mutationFn: async (params: SignUpParams) => {
            const { data } = await httpClient.post("/signup", params)
            setToken(data.accessToken)
        }
    })
    const signOut = useCallback(async () => {
        setToken(null)
        await AsyncStorage.removeItem(TOKEN_STORAGE_KEY)
    }, [])

    const { data: user, isFetching: isLoadingUser } = useQuery({
        enabled: !!token,
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await httpClient.get<{ user: User}>("/me")
            const { user } = data

            return user
        }
    })

    const isLoading = isLoadingToken || (!!token && isLoadingUser)
    return (
        <AuthContext.Provider 
            value={{
                user: user ?? null,
                isLoggedIn: !!token, 
                isLoading: isLoading,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
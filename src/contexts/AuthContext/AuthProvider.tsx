import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { AuthContext } from ".";
import { AuthTokensManager } from "../../lib/AuthTokensManager";
import { Service } from "../../services/Service";

import { AuthService } from "../../services/AuthService";
import { useUser } from "../../hooks/queries/useUser";



export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [tokens, setTokens] = useState<AuthTokensManager.Tokens | null>(null)
    const [isLoadingToken, setIsLoadingToken] = useState(true)
    const { user, isLoadingUser } = useUser({ accessToken: tokens?.accessToken ?? null})

    useEffect(() => {
        async function load() {
            const tokens = await AuthTokensManager.load()
            setTokens(tokens)
            setIsLoadingToken(false)
        }
        load()
    }, [])

    useEffect(() => {
        async  function run() {
            if (!tokens) {
                Service.removeAccessToken()
                return
            }
            await AuthTokensManager.save(tokens)
            Service.setAccessToken(tokens.accessToken)
        }
        run()
    }, [tokens])

    const { mutateAsync: signIn } = useMutation({
        mutationFn: async (payload: AuthService.SignInPayload) => {
            const data = await AuthService.signIn(payload)
            setTokens(data)
        }
    })
    const { mutateAsync: signUp } = useMutation({
        mutationFn: async (payload: AuthService.SignUpPayload) => {
            const data = await AuthService.signUp(payload)
            setTokens(data)
        }
    })
    const signOut = useCallback(async () => {
        setTokens(null)
        await AuthTokensManager.clear()
    }, [])

    const isLoading = isLoadingToken || (!!tokens && isLoadingUser)
    return (
        <AuthContext.Provider 
            value={{
                user: user ?? null,
                isLoggedIn: !!tokens && !!user, 
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
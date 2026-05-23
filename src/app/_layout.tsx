import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useEffect } from 'react';
import * as SplashScreen from "expo-splash-screen";
import { 
  useFonts,
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  HostGrotesk_700Bold,
} from "@expo-google-fonts/host-grotesk"

import { useAuth } from "../hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "../styles/global.css"
import { AuthContextProvider } from "../contexts/AuthContexts";
import { DateProvider } from "../contexts/DateContext/CurrentDateContext";

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()


export default function Layout() {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <DateProvider>
                        <RootLayout />
                    </DateProvider>
                </AuthContextProvider>
            </QueryClientProvider>
        </SafeAreaProvider>
    )
}

function RootLayout() {

    const { isLoggedIn, isLoading } = useAuth()

    const [loaded, error] = useFonts({
        HostGrotesk_400Regular,
        HostGrotesk_500Medium,
        HostGrotesk_600SemiBold,
        HostGrotesk_700Bold,
    })

    useEffect(() => {
        async function render() {
            if ((loaded || error) && (!isLoading)) {
                await SplashScreen.hideAsync()
            }
        }
        render()
    }, [loaded, error, isLoading])

    if (!loaded || isLoading) {
        return null
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="(private)" />
            </Stack.Protected>

            <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="(public)" />
            </Stack.Protected>
        </Stack>
    )
}
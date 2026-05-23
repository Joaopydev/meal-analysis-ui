import { View } from "react-native"
import { HomeHeader } from "../../components/HomeHeader"
import { MealsList } from "../../components/MealsList"
import { CreateBottomBar } from "../../components/CreateMealBottomBar"
import { StatusBar } from "expo-status-bar"

export default function Home () {
    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark"/>
            <HomeHeader />
            <MealsList />
            <CreateBottomBar />
        </View>
    )
}
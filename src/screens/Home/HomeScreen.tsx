import { View } from "react-native"
import { HomeHeader } from "../../components/HomeHeader"
import { MealsList } from "../../components/MealsList"
import { CreateBottomBar } from "../../components/CreateMealBottomBar"

export function HomeScreen () {
    return (
        <View className="flex-1 bg-white">
            <HomeHeader />
            <MealsList />
            <CreateBottomBar />
        </View>
    )
}
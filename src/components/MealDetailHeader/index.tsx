import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeftIcon } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MealDetailHeaderProps {
    calories: number
}

export function MealDetailHeader({ calories }: MealDetailHeaderProps) {
    return (
        <View className="bg-black-700 h-[130px] w-full">
            <SafeAreaView className="px-4 flex-row items-center justify-between mt-11">
                <View className="flex-row gap-6 items-center justify-center">
                    <TouchableOpacity onPress={router.back}>
                        <ChevronLeftIcon size={36} color="#fff"/>
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-sans-medium">Macros Totais</Text>
                </View>
                <View className="flex-row gap-4 items-center justify-center">
                    <Text className="text-gray-600 text-xl font-sans-medium">Calorias</Text>
                    <Text className="text-orange-400 text-xl font-sans-medium">{calories}</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}
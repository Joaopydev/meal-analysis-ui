import { TouchableOpacity, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { LogOutIcon} from "lucide-react-native"
import { colors } from "../styles/colors"

export function HomeHeader () {
    return (
        <View className="bg-lime-400 h-[130px]">
            <SafeAreaView className="px-4 py-6 flex-row items-center justify-between">
                <View>
                    <Text className="text-gray-700 text-sm font-sans-regular">Olá,👋</Text>
                    <Text className="text-black-700 text-base font-sans-semibold">João</Text>
                </View>
                <TouchableOpacity className="size-12">
                    <LogOutIcon className="size-20" color={colors.black[700]}/>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}
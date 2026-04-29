import { Text, View } from "react-native";
import { Button } from "../../../components/Button";
import { router, useLocalSearchParams } from "expo-router";

export default function MealDetails() {
    const { mealId } = useLocalSearchParams()

    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-gray-700 text-lg font-sans-regular">
                Detalhes da Refeição {mealId}
            </Text>

            <Button onPress={router.back}>
                Voltar
            </Button>
        </View>
    )
}
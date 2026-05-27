import { View, Text } from "react-native";


interface MealDetailMacroProps {
    carbohydrates: number
    proteins: number
    fats: number
    carbsPercentage: number
    proteinsPercentage: number
    fatsPercentage: number
}


export function MealDetailMacro({
    carbohydrates,
    proteins,
    fats,
    carbsPercentage,
    proteinsPercentage,
    fatsPercentage
}: MealDetailMacroProps) {

    return (
        <View className="flex">
            <View className="flex-row items-center justify-between gap-12 py-5">
                <View className="flex-col gap-4 items-center justify-center">
                    <Text className="text-gray-700 text-xl">Carboidratos</Text>
                    <Text className="text-yellow-500 text-xl">
                        {`${Math.round(carbohydrates)}g (${carbsPercentage}%)`}
                    </Text>
                </View>
                <View className="flex-col gap-4 items-center justify-center">
                    <Text className="text-gray-700 text-xl">Proteínas</Text>
                    <Text className="text-blue-500 text-xl">
                        {`${Math.round(proteins)}g (${proteinsPercentage}%)`}
                    </Text>
                </View>
                <View className="flex-col gap-4 items-center justify-center">
                    <Text className="text-gray-700 text-xl">Gorduras</Text>
                    <Text className="text-red-500 text-xl">
                        {`${Math.round(fats)}g (${fatsPercentage}%)`}
                    </Text>
                </View>
            </View>
            <View className="h-1 flex-row overflow-hidden rounded-full mt-7">
                <View
                    className="bg-yellow-500"
                    style={{ flex: carbsPercentage }}
                />

                <View
                    className="bg-blue-500"
                    style={{ flex: proteinsPercentage }}
                />

                <View
                    className="bg-red-500"
                    style={{ flex: fatsPercentage }}
                />
            </View>
        </View>
    )
}
import { View, Text } from "react-native";


interface MealDetailFoodsProps {
    name: string
    foods: {
        name: string
        quantity: string
        calories: number
        proteins: number
        carbohydrates: number
        fats: number
    }[]
}

export function MealDetailFoods({ name, foods }: MealDetailFoodsProps) {
    return (
        <View className="flex-col mt-12">
            <View className="flex flex-col justify-center gap-6">
                <Text className="text-black-700 text-2xl font-sans-semibold">{name}</Text>
                <Text className="text-gray-700 text-xl">Itens</Text>
            </View>
            <View className="flex-col">
                {foods.map((food, index) => (
                    <View key={index} className="flex-col gap-4 mt-5">
                        <Text className="text-xl pl-3">
                            {`${food.quantity} ${food.name}`}
                        </Text>
                        <View className="h-px bg-gray-400" />
                    </View>
                ))}
            </View>
        </View> 
    )
}
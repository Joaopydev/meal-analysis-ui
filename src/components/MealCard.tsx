import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { formatMealTime } from "../utils/formatDate";


interface IMealCardProps {
    id: string
    name: string
    icon: string
    foods: {
        name: string,
        calories: number,
        proteins: number,
        carbohydrates: number,
        fats: number,
    }[]
    createdAt: string
}

export function MealCard({ name, id, icon, foods, createdAt }: IMealCardProps) {

    function getFoodNames() {
        return foods.map(food => food.name).join(", ")
    }
    return (
        <Link href={`/meals/${id}`} asChild>
            <TouchableOpacity>
                <Text className="text-base font-sans-regular text-gray-700">
                    {formatMealTime(createdAt)}
                </Text>

                <View className="mt-2 px-4 py-5 flex-row gap-3 items-center border border-gray-400 rounded-2xl">
                    <View className="size-12 bg-gray-200 rounded-full items-center justify-center">
                        <Text>{icon}</Text>
                    </View>

                    <View>
                        <Text className="text-base font-sans-regular text-gray-700">
                            {name}
                        </Text>
                        <Text className="text-base font-sans-medium text-black-700 pr-8">
                            {getFoodNames()}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}
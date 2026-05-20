import { ActivityIndicator, Text, View } from "react-native";
import { Button } from "../../../components/Button";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../../services/httpClient";
import { Logo } from "../../../components/Logo";

type Meal = {
    id: string
    name: string
    icon: string
    status: "uploading" | "processing" | "success" | "failed"
    foods: {
        name: string
        calories: number
        proteins: number
        carbohydrates: number
        fats: number
    }[],
    createdAt: string
}

export default function MealDetails() {
    const { mealId } = useLocalSearchParams()
    const queryClient = useQueryClient()

    const { data: meal, isFetching } = useQuery({
        queryKey: ['meal', mealId],
        queryFn: async () => {
            const { data } = await httpClient.get<{ meal: Meal }>(`/meals/${mealId}`)
            
            return data.meal
        },
        refetchInterval: (query) => {
            if (query.state.data?.status !== "success") {
                return 2_000
            }
            queryClient.invalidateQueries({
                queryKey: ["meals"]
            })
            return false
        }
    })

    if (isFetching || meal?.status !== "success") {
        return (
            <View className="flex-1  bg-lime-700 items-center justify-center gap-12">
                <Logo width={187} height={60} />
                <ActivityIndicator color="#fff"/>
            </View>
        )
    }

    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-gray-700 text-lg font-sans-regular">
                Detalhes da Refeição {mealId}
            </Text>

            <Text>
                {JSON.stringify(meal, null, 2)}
            </Text>

            <Button onPress={router.back}>
                Voltar
            </Button>
        </View>
    )
}
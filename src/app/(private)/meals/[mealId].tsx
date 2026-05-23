import { ActivityIndicator, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";

import { httpClient } from "../../../services/httpClient";
import { Logo } from "../../../components/Logo";
import { MealDetailHeader } from "../../../components/MealDetailHeader";
import { MealDetailMacro } from "../../../components/MealDetailMacro";
import { MealDetailFoods } from "../../../components/MealDetailFoods";
import { useMemo } from "react";
import { useDate } from "../../../contexts/DateContext/useDate";

type Food = {
    name: string
    quantity: string
    calories: number
    proteins: number
    carbohydrates: number
    fats: number
}

type Meal = {
    id: string
    name: string
    icon: string
    status: "uploading" | "processing" | "success" | "failed"
    foods: Food[],
    createdAt: string
}

export default function MealDetails() {
    const { mealId } = useLocalSearchParams()
    const queryClient = useQueryClient()
    const { currentDate } = useDate()

    const { data: meal, isFetching } = useQuery<Meal>({
        queryKey: ['meal', mealId],
        enabled: !!mealId,
        queryFn: async () => {
            const { data } = await httpClient.get<{ meal: Meal }>(`/meals/${mealId}`)
            
            return data.meal
        },
        refetchInterval: (query) => {
            if (query.state.data?.status === "success") {
                queryClient.invalidateQueries({
                    queryKey: ["meals", currentDate]
                })
                return false
            }
            return 2_000
        }
    })

    const summary = useMemo(() => (
        (meal?.foods ?? []).reduce(
            (acc, food) => {
                const proteinsCalories = food.proteins * 4;
                const carbohydratesCalories = food.carbohydrates * 4;
                const fatsCalories = food.fats * 9;
                const totalCalories = Math.round(proteinsCalories + carbohydratesCalories + fatsCalories);

                return {
                    calories: acc.calories + totalCalories,
                    proteins: acc.proteins + food.proteins,
                    carbohydrates: acc.carbohydrates + food.carbohydrates,
                    fats: acc.fats + food.fats,
                };
            },
            { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
        )
    ), [meal?.foods]);

    const percentages = useMemo(() => {
        const proteinsCalories = summary.proteins * 4;
        const carbohydratesCalories = summary.carbohydrates * 4;
        const fatsCalories = summary.fats * 9;

        if (summary.calories === 0) {
            return { proteins: 0, carbohydrates: 0, fats: 0 };
        }

        return {
            proteins: Math.round((proteinsCalories * 100) / summary.calories),
            carbohydrates: Math.round((carbohydratesCalories * 100) / summary.calories),
            fats: Math.round((fatsCalories * 100) / summary.calories),
        };
    }, [summary]);
    
    if (isFetching || meal?.status !== "success") {
        return (
            <View className="flex-1  bg-lime-700 items-center justify-center gap-12">
                <Logo width={187} height={60} />
                <ActivityIndicator color="#fff"/>
            </View>
        )
    }

    return (
        <>
            <StatusBar style="light" />
            <View className="flex-1 items-center justify-center">
                <MealDetailHeader calories={summary.calories}/>
                <View className="flex-1">
                    <MealDetailMacro
                        carbohydrates={summary.carbohydrates}
                        proteins={summary.proteins}
                        fats={summary.fats}
                        carbsPercentage={percentages.carbohydrates}
                        proteinsPercentage={percentages.proteins}
                        fatsPercentage={percentages.fats}
                    />
                    <MealDetailFoods name={meal.name} foods={meal.foods} />
                </View>
            </View>
        </>
    )
}
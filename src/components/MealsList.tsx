import { View, Text, FlatList } from "react-native"
import { useMemo } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useQuery } from "@tanstack/react-query"

import { MealCard } from "./MealCard"
import { DailyStats } from "./DailyStats"
import { DataSwitcher } from "./DataSwitcher"
import { useAuth } from "../hooks/useAuth"
import { httpClient } from "../services/httpClient"
import { useDate } from "../contexts/DateContext/useDate"


type Meal = {
    id: string,
    name: string,
    icon: string,
    foods: {
        name: string,
        calories: number,
        proteins: number,
        carbohydrates: number,
        fats: number,
    }[],
    createdAt: string
}

interface IMealsListHeaderProps {
    meals: Meal[]
}


function MealsListHeader({ meals }: IMealsListHeaderProps) {
    const { user } = useAuth()

    const summary = useMemo(() => (
        (meals || []).flatMap(meal => meal.foods).reduce(
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
    ), [meals]);
    return (
        <>
            <DataSwitcher />
            <View className="mt-2">
            <DailyStats 
                calories={{
                    current: summary.calories,
                    goal: user!.calories,
                }
                }
                proteins={{
                    current: summary.proteins,
                    goal: user!.proteins,
                }
                }
                carbohydrates={{
                    current: summary.carbohydrates,
                    goal: user!.carbohydrates,
                }
                }
                fats={{
                    current: summary.fats,
                    goal: user!.fats,
                }
                }
            />
            </View>

            <View className='h-px bg-gray-200 mt-7'/>

            <Text className="text-black-700 m-5 text-base font-sans-medium tracking-[1.28px]">
                Refeições
            </Text>
        </>
    )
}

function Separator() {
    return (
        <View className="h-8"/>
    )
}


export function MealsList() {
    const { bottom } = useSafeAreaInsets()
    const { currentDate } = useDate()

    const { data: meals, isLoading } = useQuery({
        queryKey: ['meals', currentDate],
        queryFn: async () => {
            const { data } = await httpClient.get<{ meals: Meal[] }>("/meals", {
                params: {
                    date: currentDate,
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                }
            })
            return data.meals
        },
    })

    return (
        <FlatList
            data={meals}
            keyExtractor={meal => meal.id}
            contentContainerStyle={{ paddingBottom: 80 + bottom + 16 }}
            //contentContainerStyle={{ gap: 32 }}
            // contentContainerClassName="gap-8 px-5"
            ListHeaderComponent={<MealsListHeader meals={meals || []} />}
            ListEmptyComponent={
                <View className="px-5">
                    {isLoading ? (
                        <Text className="text-black-700 text-base font-sans-medium">Carregando...</Text>
                    ) : (
                        <Text className="text-black-700 text-base font-sans-medium">Nenhuma refeição cadastrada</Text>
                    )}
                </View>
            }
            ItemSeparatorComponent={Separator}
            renderItem={({ item: meal }) => (
                <View className="mx-5">
                    <MealCard
                        id={meal.id}
                        name={meal.name}
                        icon={meal.icon}
                        foods={meal.foods}
                        createdAt={meal.createdAt}
                    />
                </View>
            )}
        />
    )
}
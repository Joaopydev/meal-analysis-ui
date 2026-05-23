import { View, Text, FlatList } from "react-native"
import { MealCard } from "./MealCard"
import { DailyStats } from "./DailyStats"
import { DataSwitcher } from "./DataSwitcher"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAuth } from "../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
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


function MealsListHeader() {
    const { user } = useAuth()
    return (
        <>
            <DataSwitcher />
            <View className="mt-2">
            <DailyStats 
                calories={{
                    current: 0,
                    goal: user!.calories,
                }
                }
                proteins={{
                    current: 0,
                    goal: user!.proteins,
                }
                }
                carbohydrates={{
                    current: 0,
                    goal: user!.carbohydrates,
                }
                }
                fats={{
                    current: 0,
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

    const { data: meals } = useQuery({
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
            ListHeaderComponent={<MealsListHeader />}
            ListEmptyComponent={
                <View className="px-5">
                    <Text className="text-black-700 text-base font-sans-medium">Nenhuma refeição cadastra</Text>
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
                    />
                </View>
            )}
        />
    )
}
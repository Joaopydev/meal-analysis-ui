import { View, Text, FlatList } from "react-native"
import { MealCard } from "./MealCard"
import { DailyStats } from "./DailyStats"
import { DataSwitcher } from "./DataSwitcher"
import { useSafeAreaInsets } from "react-native-safe-area-context"


const meals = [
    {
        id: String(Math.random()),
        name: "Café da manhã"
    },
    {
        id: String(Math.random()),
        name: "Café da manhã"
    },
    {
        id: String(Math.random()),
        name: "Café da manhã"
    },
    {
        id: String(Math.random()),
        name: "Café da manhã"
    },
    {
        id: String(Math.random()),
        name: "Café da manhã"
    },
    {
        id: String(Math.random()),
        name: "Café da manhã"
    },
    {
        id: String(Math.random()),
        name: "Café da manhã"
    },
]

function MealsListHeader() {
    return (
        <>
            <DataSwitcher />
            <View className="mt-2">
            <DailyStats 
                calories={{
                    current: 2000,
                    goal: 2500,
                }
                }
                proteins={{
                    current: 500,
                    goal: 2500,
                }
                }
                carbohydrates={{
                    current: 500,
                    goal: 2500,
                }
                }
                fats={{
                    current: 500,
                    goal: 2500,
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

    return (
        <FlatList
            data={meals}
            keyExtractor={meal => meal.id}
            contentContainerStyle={{ paddingBottom: 80 + bottom + 16 }}
            //contentContainerStyle={{ gap: 32 }}
            // contentContainerClassName="gap-8 px-5"
            ListHeaderComponent={<MealsListHeader />}
            ItemSeparatorComponent={Separator}
            renderItem={({ item: meal }) => (
                <View className="mx-5">
                    <MealCard
                        id={meal.id}
                        name={meal.name}
                    />
                </View>
            )}
        />
    )
}
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { Meal } from "../../types/Meal"
import { MealService } from "../../services/MealService"

type MealParams = {
    mealId: string
    currentDate: string
}

export function useMeal({ mealId, currentDate }: MealParams) {
    const queryClient = useQueryClient()
    const { data, isFetching } = useQuery<Meal>({
        queryKey: ['meal', mealId],
        enabled: !!mealId,
        queryFn: async () => {
            const meal = await MealService.getMealById({ mealId })
            return meal
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
    return {
        meal: data,
        isFetching,
    }
}
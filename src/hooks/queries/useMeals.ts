import { useQuery } from "@tanstack/react-query"
import { MealService } from "../../services/MealService"


type MealsParams = {
    currentDate: string
}

export function useMeals({ currentDate }: MealsParams) {
    const { data, isLoading } = useQuery({
        queryKey: ['meals', currentDate],
        queryFn: async () => {
            try{
                const meals = await MealService.listMeals({ currentDate })
                return meals
            } catch (err) {
                console.error(err)
            }
        },
    })

    return {
        meals: data,
        isLoading        
    }
}
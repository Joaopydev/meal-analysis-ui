import { useMutation } from "@tanstack/react-query"
import { MealService } from "../../services/MealService"

type CreateMealParams = {
    fileType: "image/jpeg" | "audio/m4a"
    onSuccess(mealId: string): void
}

export function useCreateMeal({ fileType, onSuccess }: CreateMealParams) {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (uri: string) => {
            const mealId = await MealService.createMeal({ fileType, uri})
            return { mealId: mealId }
        },
        onSuccess: ({ mealId }) => {
            onSuccess(mealId)
        }
    })

    return {
        createMeal: mutateAsync,
        isLoading:  isPending
    }
}
import * as FileSystem from "expo-file-system/legacy"

import { Service } from "./Service";
import { type Meal } from "../types/Meal";

export class MealService extends Service {
    static async createMeal({ fileType, uri }: MealService.CreateMealPayload){
        const { data } = await this.client.post<MealService.CreateMealResponse>("/meals")

        await FileSystem.uploadAsync(data.presignedUrl, uri, {
            httpMethod: "PUT",
            uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
            headers: {
                "Content-Type": fileType,
                "x-amz-meta-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        })

        return data.meal
    }

    static async listMeals({ currentDate }: MealService.ListMealsPayload) {
        const { data } = await this.client.get<MealService.ListMealsResponse>("/meals", {
            params: {
                date: currentDate,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        })
        return data.meals
    }

    static async getMealById({ mealId }: MealService.GetMealByIdPayload) {
        const { data } = await this.client.get<MealService.GetMealByIdResponse>(`/meals/${mealId}`)
        return data.meal
    }
}

export namespace MealService {
    export type CreateMealResponse = {
        meal: string
        presignedUrl: string
    }

    export type CreateMealPayload = {
        fileType: "image/jpeg" | "audio/m4a"
        uri: string
    }

    export type ListMealsPayload = {
        currentDate: string
    }

    export type ListMealsResponse = {
        meals: Meal[]
    }

    export type GetMealByIdPayload = {
        mealId: string
    }

    export type GetMealByIdResponse = {
        meal: Meal
    }
}
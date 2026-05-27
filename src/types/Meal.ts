
export type Food = {
    name: string
    quantity: string
    calories: number
    proteins: number
    carbohydrates: number
    fats: number
}

export type Meal = {
    id: string,
    name: string,
    icon: string,
    status: "uploading" | "processing" | "success" | "failed"
    foods: Food[],
    createdAt: string
}
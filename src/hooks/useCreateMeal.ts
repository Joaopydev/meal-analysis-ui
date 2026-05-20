import { useMutation } from "@tanstack/react-query"
import * as FileSystem from "expo-file-system/legacy"

import { httpClient } from "../services/httpClient"


type CreateMealResponse = {
  mealId: string
  presignedUrl: string
}

type CreateMealParams = {
    fileType: "image/jpeg" | "audio/m4a"
    onSuccess(mealId: string): void
}

export function useCreateMeal({ fileType, onSuccess }: CreateMealParams) {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (uri: string) => {
            const { data } = await httpClient.post<CreateMealResponse>("/meals", {
                fileType: fileType
            })
            await FileSystem.uploadAsync(data.presignedUrl, uri, {
                httpMethod: "PUT",
                uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
                headers: {
                    "Content-Type": fileType
                }
            })
            return { mealId: data.mealId }
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
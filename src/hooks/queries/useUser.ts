import { useQuery } from "@tanstack/react-query"
import { AccountService } from "../../services/AccountService"

type UserParams = {
    accessToken: string | null
}

export function useUser({ accessToken }: UserParams) {
    const { data, isFetching } = useQuery({
        enabled: !!accessToken,
        queryKey: ['user'],
        queryFn: async () => {
            const user = await AccountService.getUser()

            return user
        }
    })
    return {
        user: data,
        isLoadingUser: isFetching,
    }
}
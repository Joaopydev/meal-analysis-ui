import { use } from "react"
import { AuthContext } from "../contexts/AuthContexts"


export function useAuth() {
    return use(AuthContext)
}
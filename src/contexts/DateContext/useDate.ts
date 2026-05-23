import { use } from "react"
import { DateContext } from "."


export function useDate() {
    return use(DateContext)
}
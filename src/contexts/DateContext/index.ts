import { createContext } from "react";


interface ICurrentDateContextValue {
    currentDate: string
    onPreviousDate: () => void
    onNextDate: () => void
}


export const DateContext = createContext({} as ICurrentDateContextValue)
import { useMemo, useState } from "react";
import { DateContext } from ".";

export function DateProvider({ children }: { children: React.ReactNode }) {

    const [currentDate, setCurrentDate] = useState(new Date)

    const dateParam = useMemo(() => {
        const year = currentDate.getFullYear()
        const month = String(currentDate.getMonth() + 1).padStart(2, "0")
        const day = String(currentDate.getDate()).padStart(2, "0")

        return `${year}-${month}-${day}`
    }, [currentDate])

    function handlePreviousDate() {
        setCurrentDate(prevState => {
            const newDate = new Date(prevState)
            newDate.setDate(newDate.getDate() - 1)

            return newDate
        })
    }

    function handleNextDate() {
        setCurrentDate(prevState => {
            const newDate = new Date(prevState)
            newDate.setDate(newDate.getDate() + 1)

            return newDate
        })
    }

    return (
        <DateContext.Provider
            value={{
                currentDate: dateParam,
                onPreviousDate: handlePreviousDate,
                onNextDate: handleNextDate,
            }}
        >
            { children }
        </DateContext.Provider>
    )
}
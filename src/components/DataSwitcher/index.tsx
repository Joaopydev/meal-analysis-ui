import { Text, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native"

import { colors } from "../../styles/colors";
import { useDate } from "../../contexts/DateContext/useDate";
import { formatDateToPt } from "../../utils/formatDate";

export function DataSwitcher () {
    const { currentDate, onPreviousDate, onNextDate } = useDate()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [year, month, day] = currentDate.split("-").map(Number)

    const selectedDate = new Date(year, month - 1, day)
    selectedDate.setHours(0, 0, 0, 0)

    const canGoNextDate =
        selectedDate.getTime() != today.getTime()

    return (
        <View className="px-2 mt-3 flex-row items-center justify-between">
            <TouchableOpacity
                className="size-12 items-center justify-center"
                onPress={onPreviousDate}
            >
                <ChevronLeftIcon
                    className="size-20" color={colors.black[700]}
                /> 
            </TouchableOpacity>
            <Text className="font-sans-medium text-base text-gray-700 tracking-[1.28px]">
                {formatDateToPt(currentDate)}
            </Text>
            <TouchableOpacity 
                className="size-12 items-center justify-center"
                onPress={onNextDate}
                disabled={!canGoNextDate}
            >
                <ChevronRightIcon
                    className="size-20"
                    color={
                        canGoNextDate
                            ? colors.black[700]
                            : colors.gray[400]
                    } 
                />
            </TouchableOpacity>
        </View>
    )
}
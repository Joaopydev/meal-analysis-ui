import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Button } from "../Button"
import { CameraIcon, MicIcon } from "lucide-react-native"
import { useState } from "react"
import { AudioModal } from "../AudioModal"
import { PictureModal } from "../PictureModal"

export function CreateBottomBar () {
    const { bottom } = useSafeAreaInsets()

    const [isOpeningAudioModal, setIsOpeningAudioModal] = useState(false)
    const [isOpeningPictureModal, setIsOpeningPictureModal] = useState(false)

    return (
        <View 
          className="absolute bg-white z-10 w-full bottom-0 border-t border-gray-400"
          style={{ height: 80 + bottom }}
        >
            <View className="flex-row mx-auto gap-4 mt-4">
                <Button size="icon" color="gray" onPress={() => setIsOpeningAudioModal(true)}>
                    <MicIcon />
                </Button>
                <Button size="icon" color="gray" onPress={() => setIsOpeningPictureModal(true)}>
                    <CameraIcon />
                </Button>
            </View>

            <AudioModal open={isOpeningAudioModal} onClose={() => setIsOpeningAudioModal(false)} />
            <PictureModal open={isOpeningPictureModal} onClose={() => setIsOpeningPictureModal(false)} />
        </View>
    )
}
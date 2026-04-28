import { StatusBar } from 'expo-status-bar';
import { CameraIcon, CheckIcon, Trash2Icon, XIcon} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Image, Modal, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { useAudioRecorder, useAudioRecorderState, RecordingPresets, AudioModule, setAudioModeAsync, useAudioPlayer } from 'expo-audio';


interface IPictureModalProps {
    open: boolean
    onClose: () => void
}


export function PictureModal({
    onClose,
    open,
}: IPictureModalProps) {
    const [hasPermisson, setHasPermission] = useState(false)
    const [pictureUri, setPictureUri] = useState<null | string>(null)

    function handleCloseModal() {
        onClose()
        setPictureUri(null)
    }

    function handleTakePicture() {
        setPictureUri("mock-picture-uri")
    }

    function handleRequestPermission() {
        setHasPermission(true)
    }

    function handleDeletePicture() {
        setPictureUri(null)
    }

    return (
        <Modal
          transparent
          statusBarTranslucent
          onRequestClose={handleCloseModal}
          visible={open}
          animationType='slide'
        >
            <StatusBar style="light" />

            <View className="flex-1 bg-black">
                {!hasPermisson && (
                    <View className='flex-1 items-center justify-center'>
                        <Text className="text-white text-center px-10 text-base font-sans-regular mb-4">
                            Precisamos de permissão para acessar a câmera do seu dispositivo
                        </Text>
                        <Button onPress={handleRequestPermission}>
                            Conceder permissão
                        </Button>
                    </View>
                )}

                {hasPermisson && (
                    <SafeAreaProvider>
                        <SafeAreaView className="flex-1">
                            <View className="flex-row p-5">
                                <Button size="icon" color="dark" onPress={handleCloseModal}>
                                    <XIcon size={20} color={colors.gray[500]} />
                                </Button>
                            </View>

                            {!pictureUri && (
                                <View className="flex-1 bg-gray-800">
                                    <Text className="text-white text-lg font-sans-regular">
                                        Câmera simulada
                                    </Text>
                                </View>
                            )}

                            {pictureUri && (
                                <View className="flex-1 bg-gray-800 items-center justify-center">
                                    <Text className="text-white text-lg font-sans-regular">
                                        Foto capturada
                                    </Text>
                                </View>
                            )}

                           {!pictureUri && (
                                <View className="p-5 pt-6 items-center gap-2 pb-12">
                                    <View className="flex-row">
                                        <Button size="icon" color="dark" onPress={handleTakePicture}>
                                            <CameraIcon size={20} color={colors.lime[600]} />
                                        </Button>
                                    </View>

                                    <Text className="text-gray-100 text-base font-sans-regular">Tirar Foto</Text>
                                </View>
                            )}


                            {pictureUri && (
                                <View className="p-5 pt-6 items-center gap-8 pb-12 flex-row justify-center">
                                    <Button size="icon" color="dark" onPress={handleDeletePicture}>
                                        <Trash2Icon size={20} color={colors.gray[500]} />
                                    </Button>
                                    <Button size="icon">
                                        <CheckIcon size={20} color={colors.black[700]} />
                                    </Button>
                                </View>
                            )}
                        </SafeAreaView>
                    </SafeAreaProvider>
                )}
            </View>

        </Modal>
    )
}
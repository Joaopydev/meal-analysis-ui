import { useCameraPermissions, CameraView } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { CameraIcon, CheckIcon, Trash2Icon, XIcon, Images } from 'lucide-react-native';
import { useState, useRef } from 'react';
import { Image, Modal, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from "expo-image-picker"

import { colors } from '../../styles/colors';
import { Button } from '../Button';
import { useCreateMeal } from '../../hooks/mutations/useCreateMeal';
import { router } from 'expo-router';

interface IPictureModalProps {
    open: boolean
    onClose: () => void
}


export function PictureModal({
    onClose,
    open,
}: IPictureModalProps) {
    const [pictureUri, setPictureUri] = useState<null | string>(null)
    const [permission, requestPermission] = useCameraPermissions()
    const cameraRef = useRef<CameraView>(null)
    const { createMeal, isLoading } = useCreateMeal({
        fileType: "image/jpeg",
        onSuccess: mealId => {
            router.push(`/meals/${mealId}`)
            handleCloseModal()
        }
    })

    function handleCloseModal() {
        onClose()
        setPictureUri(null)
    }

    async function handleTakePicture() {
        if (!cameraRef.current) return

        const { uri } = await cameraRef.current.takePictureAsync({
            imageType: "jpg",
        })
        setPictureUri(uri)
    }

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 1
        })

        if (!result.canceled) {
            setPictureUri(result.assets[0].uri)
        }
    }

    function handleRequestPermission() {
        requestPermission()
    }

    function handleDeletePicture() {
        setPictureUri(null)
    }

    if (!permission) {
        return null
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
                {!permission.granted && (
                    <View className='flex-1 items-center justify-center'>
                        <Text className="text-white text-center px-10 text-base font-sans-regular mb-4">
                            Precisamos de permissão para acessar a câmera do seu dispositivo
                        </Text>
                        <Button onPress={handleRequestPermission}>
                            Conceder permissão
                        </Button>
                    </View>
                )}

                {permission.granted && (
                    <SafeAreaProvider>
                        <SafeAreaView className="flex-1">
                            <View className="flex-row p-5">
                                <Button size="icon" color="dark" onPress={handleCloseModal}>
                                    <XIcon size={20} color={colors.gray[500]} />
                                </Button>
                            </View>

                            {!pictureUri && (
                                <CameraView ref={cameraRef} style={{ flex: 1 }} />
                            )}

                            {pictureUri && (
                                <Image 
                                  source={{ uri: pictureUri }}
                                  className="flex-1"
                                  resizeMode="contain"
                                />
                            )}

                           {!pictureUri && (
                                <View className="flex-row p-5 pt-6 items-center justify-center gap-6 pb-12">
                                    <View className="gap-4 items-center">
                                        <Button size="icon" color="dark" onPress={handleTakePicture}>
                                            <CameraIcon size={20} color={colors.lime[600]} />
                                        </Button>
                                        <Text className="text-gray-100 text-base font-sans-regular">Tirar Foto</Text>
                                    </View>
                                    <View className="gap-4 items-center">
                                        <Button size="icon" color="dark" onPress={pickImage}>
                                            <Images size={20} color={colors.lime[600]} />
                                        </Button>
                                        <Text className="text-gray-100 text-base font-sans-regular">Galeria</Text>
                                    </View>
                                </View>
                            )}


                            {pictureUri && (
                                <View className="p-5 pt-6 items-center gap-8 pb-12 flex-row justify-center">
                                    <Button 
                                        size="icon" 
                                        color="dark" 
                                        onPress={handleDeletePicture}
                                    >
                                        <Trash2Icon size={20} color={colors.gray[500]} />
                                    </Button>
                                    <Button
                                        size="icon" onPress={() => createMeal(pictureUri)}
                                        loading={isLoading}
                                    >
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
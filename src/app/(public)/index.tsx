import { ImageBackground, Text, View } from "react-native";
import { Logo } from "../../components/Logo";
import { Button } from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function AuthDefaultScreen() {
    return (
        <ImageBackground
          source={require("../assets/image.jpg")}
          className="flex-1"
        >
            <SafeAreaView className="flex-1">
                <View className="flex-1 items-center justify-between">
                    <View className="mx-auto mt-20">
                        <Logo width={100} height={32}/>
                    </View>
                    <View className="w-full items-center">
                        <Text className="text-white font-sans-semibold text-[32px] text-center w-[311px]">
                            Controle sua dieta de forma simples
                        </Text>
                        <View className="p-5 w-full mt-6">
                            <Link href={"/signup"} asChild>
                                <Button className="w-full">
                                    Criar conta
                                </Button>
                            </Link>
                            <View className="mt-[30px] flex-row items-center justify-center gap-2">
                                <Text className="text-base text-white font-sans-regular">Já tem conta?</Text>
                                <Link href={"/signin"} asChild>
                                    <Text className="text-base text-lime-500 font-sans-medium">Acesse agora!</Text>
                                </Link>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}
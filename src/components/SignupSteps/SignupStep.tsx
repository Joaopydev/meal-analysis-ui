import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "lucide-react-native";
import { router } from "expo-router";

import { Input } from "../Input";
import { Button } from "../Button";
import { colors } from "../../styles/colors";


export function SignupStep() {
    return (
        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <SafeAreaView className="flex-1">
                <View className="justify-between flex-1">
                    <View className="gap-6">
                        <Input
                        label="Nome"
                        keyboardType="default"
                        autoCapitalize="words"
                        autoCorrect={false}
                        autoComplete="name"
                        />
                        <Input
                        label="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="email"
                        />
                        <Input
                        label="Senha"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="password"
                        isPasswordInput={true}
                        />
                        <Input
                        label="Confirmar senha"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="password"
                        isPasswordInput={true}
                        />
                    </View>
                </View>
                <View className="flex-row gap-6">
                    <Button onPress={router.back} size="icon" color="gray">
                        <ArrowLeftIcon size={20} color={colors.black[700]}/>
                    </Button>
                    <Button className="flex-1 justify-center">
                        Criar conta
                    </Button>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}
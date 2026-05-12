import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "../Input";
import { SignUpFormData } from "./signUpSchema";


export function SignupStep() {
    const form = useFormContext<SignUpFormData>()

    return (
        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <SafeAreaView className="flex-1">
                <View className="justify-between flex-1">
                    <View className="gap-6">
                        <Controller
                        control={form.control}
                        name="account.name"
                        render={({ field, fieldState }) => (
                            <Input
                            label="Nome"
                            keyboardType="default"
                            autoCapitalize="words"
                            autoCorrect={false}
                            autoComplete="name"
                            onChangeText={field.onChange}
                            value={field.value}
                            error={fieldState.error?.message}
                            />
                        )}
                        />
                        <Controller
                        control={form.control}
                        name="account.email"
                        render={({ field, fieldState }) => (
                            <Input
                            label="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="email"
                            onChangeText={field.onChange}
                            value={field.value}
                            error={fieldState.error?.message}
                            />
                        )}
                        />
                        <Controller
                        control={form.control}
                        name="account.password"
                        render={({ field, fieldState }) => (
                            <Input
                            label="Senha"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="password"
                            isPasswordInput={true}
                            onChangeText={field.onChange}
                            value={field.value}
                            error={fieldState.error?.message}
                            />
                        )}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}
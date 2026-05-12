import { KeyboardAvoidingView, Platform, View } from "react-native";
import { router } from "expo-router";
import { ArrowLeftIcon, UserIcon} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthLayout } from "../../components/AuthLayout";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { colors } from "../../styles/colors";

const schema = z.object({
    email: z.email("Informe um e-mail válido"),
    password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
})

export default function SignIn() {

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const handleSubmit = form.handleSubmit((formData) => {

    })

    return (
        <AuthLayout
          icon={<UserIcon size={24} color={colors.black[700]} />}
          title="Entre em sua conta"
          subtitle="Informe seus dados para continuar"
        >
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <SafeAreaView className="flex-1">
                    <View className="justify-between flex-1">
                        <View className="gap-6">
                            <Controller
                              control={form.control}
                              name="email"
                              render={({ field, fieldState }) => (
                                <Input
                                  label="E-mail"
                                  keyboardType="email-address"
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                  autoComplete="email"
                                  value={field.value}
                                  onChangeText={field.onChange}
                                  error={fieldState.error?.message}
                                />
                              )}
                            />
                            <Controller
                              control={form.control}
                              name="password"
                              render={({ field, fieldState }) =>(
                                <Input
                                  label="Senha"
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                  autoComplete="password"
                                  isPasswordInput={true}
                                  value={field.value}
                                  onChangeText={field.onChange}
                                  error={fieldState.error?.message}
                                />
                              )}
                            />
                        </View>
                    </View>
                    <View className="flex-row gap-6">
                        <Button onPress={router.back} size="icon" color="gray">
                            <ArrowLeftIcon size={20} color={colors.black[700]}/>
                        </Button>
                        <Button className="flex-1 justify-center" onPress={handleSubmit}>
                            Entrar
                        </Button>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </AuthLayout>
    )
}
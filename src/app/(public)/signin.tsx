import { View } from "react-native";
import { AuthLayout } from "../../components/AuthLayout";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { router } from "expo-router";
import { ArrowLeftIcon} from "lucide-react-native";
import { colors } from "../../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {

    return (
        <AuthLayout
          icon="👤"
          title="Entre em sua conta"
          subtitle="Informe seus dados para continuar"
        >
            <SafeAreaView className="flex-1">
                <View className="justify-between flex-1">
                    <View className="gap-6">
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
                    </View>
                </View>
                <View className="flex-row gap-6">
                    <Button onPress={router.back} size="icon" color="gray">
                        <ArrowLeftIcon size={20} color={colors.black[700]}/>
                    </Button>
                    <Button className="flex-1 justify-center">
                        Entrar
                    </Button>
                </View>
            </SafeAreaView>
        </AuthLayout>
    )
}
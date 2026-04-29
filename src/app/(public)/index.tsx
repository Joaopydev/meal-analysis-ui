import { Text, View } from "react-native";

export default function AuthDefaultScreen() {
    return (
        <View className="flex-row bg-white items-center justify-center p-5">
            <Text className="text-2xl font-bold">Entrar</Text>
            <Text className="text-2xl font-bold">Criar Contar</Text>
        </View>
    )
}
import { ArrowLeftIcon, ArrowRightIcon, TargetIcon, VenusAndMars } from "lucide-react-native";
import { router } from "expo-router";
import { UserPlus } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

import { SignupStep } from "../../components/SignupSteps/SignupStep";
import { AuthLayout } from "../../components/AuthLayout";
import { colors } from "../../styles/colors";
import { GoalsStep } from "../../components/SignupSteps/GoalsStep";
import { GenderStep } from "../../components/SignupSteps/GenderStep";
import { Button } from "../../components/Button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../components/SignupSteps/signUpSchema";


export default function SignUp() {
    const [currentStepIndex, setCurrentStepIndex] = useState(1)

    const form = useForm({
        resolver: zodResolver(signUpSchema)
    })

    const steps = [
        {
            icon: <UserPlus size={24} color={colors.black[700]} />,
            title: "Crie sua conta",
            subtitle: "Preencha os campos abaixo para criar sua conta",
            Component: SignupStep,
            isFirstStep: true
        },
        {
            icon: <TargetIcon size={24} color={colors.black[700]} />,
            title: "Qual é o seu objetivo?",
            subtitle: "O que você pretende alcançar com a dieta?",
            Component: GoalsStep,
            isFirstStep: false
        },
        {
            icon: <VenusAndMars size={24} color={colors.black[700]} />,
            title: "Qual é o seu gênero?",
            subtitle: "Seu gênero influencia no tipo da dieta",
            Component: GenderStep,
            isFirstStep: false

        }
    ]

    const currenStep = steps[currentStepIndex]

    function handlePreviousStep() {
        if (currentStepIndex === 0) {
            router.back()
            return
        }

        setCurrentStepIndex((prev) => prev - 1)
    }

    function handleNextStep() {
        setCurrentStepIndex((prev) => prev + 1)
    }

    return (
        <AuthLayout
          icon={currenStep.icon}
          title={currenStep.title}
          subtitle={currenStep.subtitle}
        >
            <View className="flex-1 justify-between">

                <FormProvider {...form}>
                    <currenStep.Component />
                </FormProvider>

                {!currenStep.isFirstStep && (
                    <View className="flex-row justify-between">
                        <Button size="icon" color="gray" onPress={handlePreviousStep}>
                            <ArrowLeftIcon size={20} color={colors.black[700]}/>
                        </Button>
                        <Button size="icon" onPress={handleNextStep}>
                            <ArrowRightIcon size={20} color={colors.black[700]} />
                        </Button>
                    </View>
                )}
            </View>
        </AuthLayout>
    )
}
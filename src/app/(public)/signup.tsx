import { ArrowLeftIcon, ArrowRightIcon, CakeIcon, TargetIcon, DumbbellIcon, RulerIcon, VenusAndMarsIcon, UserPlusIcon, ZapIcon } from "lucide-react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

import { SignupStep } from "../../components/SignupSteps/SignupStep";
import { AuthLayout } from "../../components/AuthLayout";
import { colors } from "../../styles/colors";
import { GoalsStep } from "../../components/SignupSteps/GoalsStep";
import { GenderStep } from "../../components/SignupSteps/GenderStep";
import { BirthDateStep } from "../../components/SignupSteps/BirthDateStep";
import { HeightStep } from "../../components/SignupSteps/HeightStep";
import { WeightStep } from "../../components/SignupSteps/WeightStep";
import { ActivityLevelStep } from "../../components/SignupSteps/ActivityLevelStep";
import { Button } from "../../components/Button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../components/SignupSteps/signUpSchema";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";


export default function SignUp() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)

    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            account: {
                name: "",
                email: "",
                password: "",
            }
        }
    })

    const steps = [
        {
            icon: <TargetIcon size={24} color={colors.black[700]} />,
            title: "Qual é o seu objetivo?",
            subtitle: "O que você pretende alcançar com a dieta?",
            Component: GoalsStep,
        },
        {
            icon: <VenusAndMarsIcon size={24} color={colors.black[700]} />,
            title: "Qual é o seu gênero?",
            subtitle: "Seu gênero influencia no tipo da dieta",
            Component: GenderStep,
        },
        {
            icon: <CakeIcon size={24} color={colors.black[700]} />,
            title: "Quando você nasceu?",
            subtitle: "Sua idade ajuda a personalizar sua dieta",
            Component: BirthDateStep,
        },
        {
            icon: <RulerIcon size={24} color={colors.black[700]} />,
            title: "Qual é a sua altura?",
            subtitle: "Sua altura é importante para calcular sua dieta",
            Component: HeightStep,
        },
        {
            icon: <DumbbellIcon size={24} color={colors.black[700]} />,
            title: "Qual é o seu peso?",
            subtitle: "Seu peso atual nos ajuda a criar sua dieta",
            Component: WeightStep,
        },
        {
            icon: <ZapIcon size={24} color={colors.black[700]} />,
            title: "Qual é o seu nível de atividade?",
            subtitle: "Isso ajuda a calcular suas necessidades calóricas",
            Component: ActivityLevelStep,
        },
        {
            icon: <UserPlusIcon size={24} color={colors.black[700]} />,
            title: "Crie sua conta",
            subtitle: "Preencha os campos abaixo para criar sua conta",
            Component: SignupStep,
        },
    ]

    const currenStep = steps[currentStepIndex]
    const isLastStep = currentStepIndex === steps.length - 1

    const { signUp } = useAuth()

    console.log(form.formState.errors)

    const handleSubmit = form.handleSubmit(async (formData) => {

        const [day, month, year] = formData.birthDate.split("/")
        try {
            await signUp({
                goal: formData.goal,
                gender: formData.gender,
                height: Number(formData.height),
                weight: Number(formData.weight),
                birthDate: `${year}-${month}-${day}`,
                activityLevel: Number(formData.activityLevel),
                account: {...formData.account}
            })
        } catch {
            Alert.alert("Não foi possivel criar sua conta")
        }
    })

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

                <SafeAreaView>
                    {!isLastStep && (
                        <View className="flex-row justify-between">
                            <Button size="icon" color="gray" onPress={handlePreviousStep}>
                                <ArrowLeftIcon size={20} color={colors.black[700]}/>
                            </Button>
                            <Button size="icon" onPress={handleNextStep}>
                                <ArrowRightIcon size={20} color={colors.black[700]} />
                            </Button>
                        </View>
                    )}
                    {isLastStep && (
                        <View className="flex-row gap-6">
                            <Button onPress={handlePreviousStep} size="icon" color="gray">
                                <ArrowLeftIcon size={20} color={colors.black[700]}/>
                            </Button>
                            <Button className="flex-1 justify-center" onPress={handleSubmit} loading={form.formState.isSubmitting}>
                                Criar conta
                            </Button>
                        </View>
                    )}
                </SafeAreaView>
            </View>
        </AuthLayout>
    )
}
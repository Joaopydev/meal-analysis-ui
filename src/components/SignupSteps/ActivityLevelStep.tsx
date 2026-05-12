import { Controller, useFormContext } from "react-hook-form";
import { OptionsSelector } from "../OptionsSelector";
import { SignUpFormData } from "./signUpSchema";

export function ActivityLevelStep() {
  const form = useFormContext<SignUpFormData>();

  return (
    <Controller
      control={form.control}
      name="activityLevel"
      render={({ field }) => (
        <OptionsSelector
          options={[
            {
              icon: "🪑",
              title: "Sedentário",
              description: "Pouca ou nenhuma atividade",
              value: "1",
            },
            {
              icon: "🚶",
              title: "Leve",
              description: "Exercício leve 1-3 dias por semana",
              value: "2",
            },
            {
              icon: "🏃",
              title: "Moderado",
              description: "Exercício moderado 3-5 dias por semana",
              value: "3",
            },
            {
              icon: "🏋️",
              title: "Pesado",
              description: "Exercício intenso 6-7 dias por semana",
              value: "4",
            },
            {
              icon: "⚡",
              title: "Atleta",
              description: "Treino muito intenso e profissional",
              value: "5",
            },
          ]}
          onChange={field.onChange}
          value={field.value}
        />
      )}
    />
  );
}

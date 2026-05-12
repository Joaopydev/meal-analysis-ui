import { useFormContext } from "react-hook-form";

import { OptionsSelector } from "../OptionsSelector";
import { Controller } from "react-hook-form";
import { SignUpFormData } from "./signUpSchema";

export function GoalsStep() {
    const form = useFormContext<SignUpFormData>()

    return (
        <Controller
          control={form.control}
          name="goal"
          render={({ field }) => (
            <OptionsSelector
                options={[
                    {
                        icon: "🥦",
                        title: "Perder peso",
                        value: "lose"
                    },
                    {
                        icon: "🍍",
                        title: "Manter o peso",
                        value: "maintain"
                    },
                    {
                        icon: "🥩",
                        title: "Ganhar peso",
                        value: "gain"
                    },
                ]}
                onChange={field.onChange}
                value={field.value}
            />
          )}
        />
    )
}
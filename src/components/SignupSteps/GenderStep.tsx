import { OptionsSelector } from "../OptionsSelector";
import { Controller, useFormContext } from "react-hook-form";
import { SignUpFormData } from "./signUpSchema";

export function GenderStep() {
    const form = useFormContext<SignUpFormData>()

    return (
        <Controller
            control={form.control}
            name="gender"
            render={({ field }) => (
                <OptionsSelector
                    options={
                        [
                            {
                                icon: "♀️",
                                value: "female",
                                title: "Feminino",
                            },
                            {
                                icon: "♂️",
                                value: "male",
                                title: "Masculino",
                            },
                        ]
                    }
                    onChange={field.onChange}
                    value={field.value}
                />
            )}
        />
    )
}
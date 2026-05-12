import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../Input";
import { SignUpFormData } from "./signUpSchema";

export function WeightStep() {
  const form = useFormContext<SignUpFormData>();

  return (
    <Controller
      control={form.control}
      name="weight"
      render={({ field, fieldState }) => (
        <Input
          label="Peso"
          placeholder="Ex: 75"
          keyboardType="number-pad"
          append="kg"
          value={field.value}
          onChangeText={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../Input";
import { SignUpFormData } from "./signUpSchema";

export function HeightStep() {
  const form = useFormContext<SignUpFormData>();

  return (
    <Controller
      control={form.control}
      name="height"
      render={({ field, fieldState }) => (
        <Input
          label="Altura"
          placeholder="Ex: 180"
          keyboardType="number-pad"
          append="cm"
          value={field.value}
          onChangeText={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

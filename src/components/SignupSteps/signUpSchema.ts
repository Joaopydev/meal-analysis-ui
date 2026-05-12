import z from "zod";

export const signUpSchema = z.object({
    goal: z.enum(["gain", "mantain", "lose"]),
    gender: z.enum(["male", "female"]),
    birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data de nascimento inválida"),
    height: z.string().regex(/^\d{2,3}$/, "Altura inválida"),
    weight: z.string().regex(/^\d{1,3}$/, "Peso inválido"),
    activityLevel: z.string()
})

export type SignUpFormData = z.infer<typeof signUpSchema>

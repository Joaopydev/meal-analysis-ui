import z from "zod";

export const signUpSchema = z.object({
    goal: z.enum(["gain", "mantain", "lose"]),
    gender: z.enum(["male", "female"]),
    birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data de nascimento inválida"),
    height: z.string().regex(/^\d{2,3}$/, "Altura inválida"),
    weight: z.string().regex(/^\d{1,3}$/, "Peso inválido"),
    activityLevel: z.string(),

    account: z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.email("Email inválido"),
        password: z.string().min(8, "Senha deve conter pelo menos 8 caracteres")
    })
})

export type SignUpFormData = z.infer<typeof signUpSchema>

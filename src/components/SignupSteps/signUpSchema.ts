import z from "zod";

export const signUpSchema = z.object({
    goal: z.enum(["gain", "mantain", "lose"]),
    gender: z.enum(["male", "female"])
})

export type SignUpFormData = z.infer<typeof signUpSchema>

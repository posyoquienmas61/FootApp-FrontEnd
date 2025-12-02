import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor, introduce una dirección de correo válida.",
  }),
  password: z.string().min(1, {
    message: "La contraseña es requerida.",
  }),
})

export const registerSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
    email: z.string().email({
      message: "Por favor, introduce una dirección de correo válida.",
    }),
    password: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres.",
    }),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>

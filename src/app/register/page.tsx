"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { registerSchema, type RegisterFormValues } from "@/lib/schemas"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Tipo respuesta servidor
interface RegisterResponse {
  success: boolean
  message: string
  data?: {
    user: {
      id: string
      name: string
      email: string
      role: string
      phone?: string
      address?: string
    }
    token: string
  }
}

const registerUser = async (userData: RegisterFormValues): Promise<RegisterResponse> => {
  const response = await fetch("http://localhost:4000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userData.fullName,
      email: userData.email,
      password: userData.password,
      phone: userData.phone || null,
      address: userData.address || null,
      role: "CLIENT",
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Error en el registro")
  }

  return data
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const router = useRouter()

  // FORMULARIO ÚNICO
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    },
  })

  // MUTATION ÚNICA
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("Cuenta creada exitosamente!", {
        description: "Serás redirigido en unos segundos...",
      })

      if (data.data?.token) {
        localStorage.setItem("authToken", data.data.token)
        localStorage.setItem("user", JSON.stringify(data.data.user))
      }

      form.reset()
      setShouldRedirect(true)
    },
    onError: (error: any) => {
      toast.error("Error en el registro", {
        description: error.message,
      })
    },
  })

  // REDIRECCIÓN
  useEffect(() => {
    if (shouldRedirect) {
      const timer = setTimeout(() => {
        router.push("/")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [shouldRedirect, router])

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT COLUMN */}
      <div className="flex items-center justify-center p-8 bg-slate-950 min-h-screen">
        <div className="mx-auto w-full max-w-md space-y-8 py-10">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-white">Crea tu cuenta</h1>
            <p className="text-slate-400">
              Únete a FootApp para gestionar tus citas de podología fácilmente.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Nombre */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Nombre completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Introduce tu nombre"
                        {...field}
                        className="bg-slate-900 border-slate-800 text-slate-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Correo */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Introduce tu email"
                        {...field}
                        className="bg-slate-900 border-slate-800 text-slate-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contraseñas */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">Contraseña</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            {...field}
                            className="bg-slate-900 border-slate-800 text-slate-200 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-slate-500"
                          >
                            {showPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">Confirmar</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Repetir contraseña"
                            {...field}
                            className="bg-slate-900 border-slate-800 text-slate-200 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-2.5 text-slate-500"
                          >
                            {showConfirmPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Teléfono */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Teléfono (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Introduce tu número"
                        {...field}
                        className="bg-slate-900 border-slate-800 text-slate-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dirección */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Dirección (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Introduce tu dirección"
                        {...field}
                        className="bg-slate-900 border-slate-800 text-slate-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botón */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white"
                disabled={registerMutation.isPending || shouldRedirect}
              >
                {registerMutation.isPending
                  ? "Creando cuenta..."
                  : shouldRedirect
                  ? "Redirigiendo..."
                  : "Registrarse"}
              </Button>
            </form>
          </Form>

          {/* Mensaje de éxito */}
          {shouldRedirect && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700 text-center">
                Registro exitoso. Serás redirigido en unos segundos...
              </p>
            </div>
          )}

          {/* Error */}
          {registerMutation.isError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700 text-center">
                {registerMutation.error?.message}
              </p>
            </div>
          )}

          <div className="text-center text-sm text-slate-400">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="font-medium text-white underline-offset-4">
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="hidden lg:flex items-center justify-center bg-slate-900 p-8">
        <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/images/registerside.png"
            fill={true}
            alt="Ilustración cuidado de pies"
            className="object-cover opacity-90"
          />
        </div>
      </div>
    </div>
  )
}

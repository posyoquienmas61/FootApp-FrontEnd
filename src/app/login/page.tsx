"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { loginSchema, type LoginFormValues } from "@/lib/schemas"
import { useLogin } from "@/hooks/useLogin"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const loginMutation = useLogin()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    loginMutation.mutate(data)
    // Aquí iría la lógica de autenticación
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Column - Form */}
      <div className="flex items-center justify-center p-8 bg-slate-950">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            {/* Logo for mobile if needed, or just context */}
            <h1 className="text-3xl font-bold tracking-tight text-white">Bienvenido de nuevo</h1>
            <p className="text-slate-400">Inicia sesión en tu cuenta</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Correo electrónico</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                        <Input
                          placeholder="tu.email@ejemplo.com"
                          className="pl-10 bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-purple-600"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Introduce tu contraseña"
                          className="pl-10 pr-10 bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-purple-600"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end">
                <Link
                  href="#"
                  className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors underline-offset-4 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "signing in..." : "Login"}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm text-slate-400">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="font-medium text-white hover:underline underline-offset-4">
              Regístrate
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden lg:flex items-center justify-center bg-slate-900 p-8">
        <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/images/loginside.png"
            alt="Consultorio Podológico FootApp"
            fill={true}
            className="object-cover"
            priority
          />
          {/* Overlay gradient just in case to blend edges if needed, but clean image is nice */}
        </div>
      </div>
    </div>
  )
}

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RegisterData {
    fullName: string
    email: string
    password: string
    confirmPassword: string
    phone?: string
    address?: string
}

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

const registerUser = async (userData: RegisterData): Promise<RegisterResponse> => {
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
}//Fin de registerUser

export function useRegister() {
    const router = useRouter()

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success("Cuenta creada exitosamente!", {
                description: "seras redirigido a la pagina principal...",
            })

            //Guardar datos de autenticacion
            if (data.data?.token) {
                localStorage.setItem("authToken", data.data.token)
                localStorage.setItem("user", JSON.stringify(data.data.user))
            }

            //Redirigir despues de 2 segundos
            setTimeout(() => {
                router.push("/")
            }, 2000)
        },
        onError: (error: Error) => {
            console.error("Error en registro:", error)

            //Manejar diferentes tipos de errores
            if (error.message.toLowerCase().includes("email") || error.message.toLowerCase().includes("correo")) {
                toast.error("Error con el email", {
                    description: error.message,
                })
            } else if (error.message.toLowerCase().includes("password") || error.message.toLowerCase().includes("ya existe")) {
                toast.error("Error con la contraseña", {
                    description: error.message,
                })
            } else if (error.message.toLowerCase().includes("already exists") || error.message.toLowerCase().includes("ya existe")) {
                toast.error("Usuario ya registrado", {
                    description: "Este email ya esta en uso. Quieres iniciar sesion?",
                    action: {
                        label: "Iniciar Sesion",
                        onClick: () => router.push("/login"),
                    },
                })
            } else {
                toast.error("Error de registro", {
                    description: error.message || "Ha ocurrido un error inesperado",
                })
            }
        },
    })//Fin de registerMutation
}//Fin de useRegister
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Tipos para los datos de login
export interface LoginData {
    email: string;
    password: string;
}

// Tipo para la respuesta del servidor
export interface LoginResponse {
    success: boolean;
    message: string;
    data?: {
        user: {
            id: string;
            name: string;
            email: string;
            role: "ADMIN" | "PODOLOGIST" | "CLIENT";
            phone?: string
            address?: string
        };
        token: string; // El token también debe estar aquí
    };
}

const loginUser = async (LoginData: LoginData): Promise<LoginResponse> => {
    const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error en el inicio de sesión");
    }

    return data;
};

export function useLogin() {
    const router = useRouter();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data: LoginResponse) => {
            toast.success("Inicio de sesión exitoso!", {
                description: "Bienvenido de vuelta a FootApp",
            });

            // Guardar datos de autenticación
            if (data.data?.token) {
                localStorage.setItem("authToken", data.data.token);
                localStorage.setItem("user", JSON.stringify(data.data.user));


                //Tambien se pueden guardar en cookies para ssr
                document.cookie = `authToken=${data.data?.token}; path=/; max-age=86400` //24 hrs
            }
            //Redirigir segun el rol del usuario
            const userRole = data.data?.user.role

            // Redirigir después de 2 segundos
            setTimeout(() => {
                switch (userRole) {
                    case "ADMIN":
                        router.push("/admin/dashboard")
                        break
                    case "PODOLOGIST":
                        router.push("/podologist/dashboard")
                        break
                    default:
                        router.push("/dashboard") // CLIENT
                }

            }, 1500)
        },
        onError: (error: Error) => {
            console.error("Error en login:", error);

            // Manejar diferentes tipos de errores
            if (error.message.toLowerCase().includes("credenciales") ||
                error.message.toLowerCase().includes("invalid") ||
                error.message.toLowerCase().includes("incorrect")) {
                toast.error("Credenciales incorrectas", {
                    description: "Por favor, verifica tu email y contraseña.",
                })
            } else if (error.message.toLowerCase().includes("email") ||
                error.message.toLowerCase().includes("usuario")) {
                toast.error("Usuario no encontrado", {
                    description: "No existe una cuenta con ese email.",
                    action: {
                        label: "Registrarse",
                        onClick: () => router.push("/register"),
                    },
                })
            } else if (error.message.toLowerCase().includes("cuenta") ||
                error.message.toLowerCase().includes("account")) {
                toast.error("Cuenta inactiva", {
                    description: "Contacta con soporte para activar tu cuenta.",
                })

            } else {
                toast.error("Error de autenticación", {
                    description: error.message || "Ha ocurrido un error inesperado",
                })
            }
        },
        // Configuración adicional
        retry: 1, // Reintentar una vez en caso de error de red
        retryDelay: 1000,
    })
}

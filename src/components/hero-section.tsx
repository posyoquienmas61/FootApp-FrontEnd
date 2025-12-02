import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          fill={true}
          alt="Consultorio Podológico"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center space-y-8 max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
          FootApp
        </h1>
        <p className="text-xl md:text-2xl text-purple-400 font-medium animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
          Cuidado experto para tus pies
        </p>
        <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          En nuestra clínica, combinamos la última tecnología con un trato humano para ofrecerte el mejor cuidado
          podológico. Tu bienestar es nuestro primer paso.
        </p>
        <div className="pt-4 animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-500">
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 h-auto shadow-lg shadow-purple-900/20"
          >
            Agendar Cita
          </Button>
        </div>
      </div>
    </section>
  )
}

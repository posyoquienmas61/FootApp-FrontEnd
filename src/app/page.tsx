import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, Phone } from "lucide-react"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Preview (Optional but good for context) */}
      <section id="servicios" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Nuestros Servicios</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Ofrecemos una amplia gama de tratamientos especializados para mantener la salud de tus pies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Podología General", desc: "Diagnóstico y tratamiento integral de las afecciones del pie." },
              { title: "Ortopodología", desc: "Estudio biomecánico y plantillas personalizadas." },
              { title: "Cirugía del Pie", desc: "Intervenciones mínimamente invasivas para soluciones definitivas." },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment CTA Section */}
      <section id="citas" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                ¿Listo para dar el siguiente paso?
              </h2>
              <p className="text-slate-300 text-lg">
                Agenda tu cita hoy mismo y deja que nuestros expertos cuiden de ti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Calendar className="mr-2 h-4 w-4" />
                  Reservar Online
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Llamar Ahora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-purple-400">FootApp</h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Cuidando de tu caminar, paso a paso. Especialistas en salud podológica con tecnología de vanguardia.
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">CONTACTO</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-purple-400" />
                <span>contacto@footapp.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-purple-400" />
                <span>+1 (234) 567-89</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-purple-400" />
                <span>123 Calle Falsa, Ciudad, País</span>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">SÍGUENOS</h4>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-purple-400 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} FootApp. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

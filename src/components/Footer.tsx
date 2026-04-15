import { Link } from "react-router-dom";
import {
  Truck,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Referencias", href: "/referencias" },
    { name: "Contacto", href: "/contacto" },
  ];

  const values = ["Empresa familiar", "Atención personalizada", "Más de 30 años"];

  return (
    <footer className="relative overflow-hidden bg-steel-dark text-secondary border-t border-steel-medium/60">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-rust/10 blur-3xl" />
      </div>

      <div className="container relative py-14 md:py-16">
        <div className="mb-10 rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/15 via-rust/10 to-transparent p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-2">
                LogiBal
              </p>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">
                Trayectoria, confianza y compromiso en cada operación
              </h3>
              <p className="text-sm md:text-base text-secondary mt-3">
                Acompañamos a cada cliente con asesoramiento transparente para encontrar la unidad indicada.
              </p>
            </div>

            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 font-display font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
            >
              Ver catálogo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="p-2 bg-accent rounded-xl shadow-glow">
                <Truck className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <span className="text-xl font-display font-bold tracking-wide text-primary-foreground">
                  LOGI<span className="text-accent">BAL</span>
                </span>
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  Camiones y acoplados
                </p>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Somos una empresa familiar dedicada a la venta de camiones y acoplados,
              con una visión cercana, seria y profesional.
            </p>

            <div className="flex flex-wrap gap-2">
              {values.map((value) => (
                <span
                  key={value}
                  className="rounded-full border border-steel-light/30 bg-steel-medium/40 px-3 py-1 text-xs text-secondary"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold text-primary-foreground mb-4">
              Navegación
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold text-primary-foreground mb-4">
              Nuestro compromiso
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-accent mt-0.5" />
                <span>Asesoramiento claro y personalizado.</span>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-accent mt-0.5" />
                <span>Experiencia real en el rubro del transporte.</span>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-accent mt-0.5" />
                <span>Relaciones construidas sobre confianza.</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold text-primary-foreground mb-4">
              Contacto directo
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+5491166414662"
                className="flex items-center gap-3 rounded-xl border border-steel-light/20 bg-steel-medium/30 p-3 text-sm hover:border-accent/40 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4 text-accent" />
                +54 9 11 66414662
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-steel-light/20 bg-steel-medium/30 p-3 text-sm">
                <MapPin className="h-4 w-4 text-accent" />
                Buenos Aires, Argentina
              </div>

              <div className="flex items-center gap-3 pt-2">
                {[Facebook, Instagram, Linkedin, Youtube].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-steel-light/20 bg-steel-medium/30 hover:border-accent hover:text-accent transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-steel-medium/60">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-3 py-5 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © {currentYear} LogiBal. Todos los derechos reservados.
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Hecho con compromiso para el transporte argentino
          </p>
        </div>
      </div>
    </footer>
  );
};

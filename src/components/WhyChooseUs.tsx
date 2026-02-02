import { Shield, Truck, Users, Headphones, CheckCircle, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Garantía Verificada",
    description: "Todos nuestros camiones pasan por una inspección de 150 puntos antes de ser publicados.",
  },
  {
    icon: Truck,
    title: "Amplio Catálogo",
    description: "Más de 500 unidades de las principales marcas: Volvo, Scania, Mercedes-Benz y más.",
  },
  {
    icon: Users,
    title: "Vendedores Certificados",
    description: "Red de vendedores verificados con historial comprobado y excelentes reseñas.",
  },
  {
    icon: Headphones,
    title: "Soporte 24/7",
    description: "Equipo de expertos disponible para asesorarte en cada paso de tu compra.",
  },
  {
    icon: CheckCircle,
    title: "Financiamiento Flexible",
    description: "Opciones de crédito adaptadas a tu negocio con tasas competitivas.",
  },
  {
    icon: Award,
    title: "Mejor Precio",
    description: "Comparamos precios del mercado para garantizarte la mejor oferta.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-steel text-primary-foreground">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            ¿Por qué elegirnos?
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">
            La plataforma líder en <span className="text-accent">compra-venta</span> de camiones
          </h2>
          <p className="text-secondary mt-4">
            Más de 10 años conectando compradores y vendedores en toda Latinoamérica.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-steel-medium/50 border border-steel-light/20 hover:border-accent/50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:shadow-glow transition-all duration-300">
                <feature.icon className="h-7 w-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-display font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

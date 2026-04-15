import { Shield, Truck, Users, Headphones, CheckCircle, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Confianza y respaldo",
    description: "Trabajamos sobre valores de honestidad, compromiso y transparencia en cada operación.",
  },
  {
    icon: Truck,
    title: "Amplio catálogo",
    description: "Contamos con camiones y acoplados seleccionados de las principales marcas del mercado.",
  },
  {
    icon: Users,
    title: "Atención personalizada",
    description: "Acompañamos a cada cliente con un trato cercano y asesoramiento a medida.",
  },
  {
    icon: Headphones,
    title: "Experiencia real",
    description: "Combinamos la trayectoria de una empresa familiar con la visión de una nueva generación.",
  },
  {
    icon: CheckCircle,
    title: "Operaciones claras",
    description: "Brindamos información precisa y un proceso serio para que compres con tranquilidad.",
  },
  {
    icon: Award,
    title: "Compromiso con el cliente",
    description: "Nuestro objetivo es encontrar la mejor solución para cada necesidad de trabajo y transporte.",
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
            Experiencia, respaldo y <span className="text-accent">atención cercana</span>
          </h2>
          <p className="text-secondary mt-4">
            Somos una empresa familiar dedicada a la venta de camiones y acoplados, acompañando cada operación con seriedad y transparencia.
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

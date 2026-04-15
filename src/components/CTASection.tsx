import { ArrowRight, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent via-rust to-warning p-8 md:p-12 lg:p-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 rounded-full mb-6">
                <Truck className="h-5 w-5" />
                <span className="text-sm font-semibold">Empresa familiar</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-accent-foreground mb-4">
                Más de 30 años acompañando al transporte
              </h2>
              <p className="text-accent-foreground/90 text-lg">
                Fundados sobre el esfuerzo, la honestidad y el compromiso, unimos la trayectoria de un padre con la energía de una nueva generación para brindarte soluciones confiables.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-accent hover:bg-primary-foreground/90 font-display text-lg px-8 shadow-industrial-lg"
              >
                <Link to="/catalogo">
                  Ver catálogo
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-steel-dark text-primary-foreground hover:bg-steel-dark/90 font-display text-lg px-8 border border-primary-foreground/20"
              >
                <Link to="/contacto">Conocenos mejor</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, Truck } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12 max-w-3xl">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            Nosotros
          </span>
          <h1 className="section-title mt-2">
            Más de 30 años de experiencia en camiones y acoplados
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            Somos una empresa familiar dedicada a la venta de camiones y acoplados, con más de 30 años de experiencia en el rubro.
            Fundada sobre valores de esfuerzo, honestidad y compromiso, combinamos la trayectoria de un padre con la energía y visión de una nueva generación.
          </p>
          <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
            Nuestro objetivo es brindar soluciones confiables a cada cliente, acompañándolo en cada paso con asesoramiento personalizado, cercano y transparente.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card-truck p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/20 rounded-xl">
                <Truck className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold">Atención con criterio y confianza</h2>
                <p className="text-muted-foreground mt-1">
                  Acompañamos cada búsqueda con una mirada práctica, entendiendo lo que necesita cada cliente para trabajar y crecer.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-border p-4 bg-background/40">
                <p className="text-sm text-muted-foreground mb-1">Trayectoria</p>
                <p className="font-semibold text-foreground">Más de 30 años</p>
              </div>
              <div className="rounded-xl border border-border p-4 bg-background/40">
                <p className="text-sm text-muted-foreground mb-1">Valores</p>
                <p className="font-semibold text-foreground">Honestidad y compromiso</p>
              </div>
              <div className="rounded-xl border border-border p-4 bg-background/40">
                <p className="text-sm text-muted-foreground mb-1">Atención</p>
                <p className="font-semibold text-foreground">Personalizada y transparente</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Creemos en el trato directo, en la palabra y en el acompañamiento real durante todo el proceso. Por eso construimos relaciones duraderas con quienes confían en nosotros.
            </p>
          </div>

          <div className="space-y-6">
            <div className="card-truck p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p className="font-semibold text-foreground">+54 9 11 66414662</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  <p className="font-semibold text-foreground">Buenos Aires, Argentina</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horario</p>
                  <p className="font-semibold text-foreground">Lun a Vie, 9:00 a 18:00</p>
                </div>
              </div>
            </div>

            <Button asChild variant="industrial" className="w-full font-display">
              <a href="tel:+5491166414662">Llamar ahora</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

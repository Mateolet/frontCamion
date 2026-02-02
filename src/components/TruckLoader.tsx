import { Truck } from "lucide-react";

export default function TruckLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative w-40 h-40 flex items-center justify-center">
        
        {/* Anillo principal */}
        <div className="absolute inset-0 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />

        {/* Anillo secundario */}
        <div className="absolute inset-4 rounded-full border-2 border-steel-light/30 border-b-accent animate-spin-slow" />

        {/* Camión */}
        <div className="z-10 bg-steel-dark p-6 rounded-full shadow-industrial-lg ring-2 ring-accent/30 animate-pulse-glow">
          <Truck className="h-12 w-12 text-accent" />
        </div>
      </div>

      <p className="mt-8 text-muted-foreground text-sm tracking-wider uppercase">
        Cargando camión...
      </p>
    </div>
  );
}

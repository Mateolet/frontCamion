import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TruckCard } from "./TruckCard";
import { ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ===============================
   Tipo API
================================ */
interface TruckAPI {
  id: number;
  anio: string;
  precio: string;
  kilometros: string;
  ubicacion: string | null;
  condicion: string;
  combustible: string;
  imagen_principal: string | null;
  imagen_principal_url?: string | null;
  imagenes?: Array<{
    id: number;
    url: string;
    posicion: string;
  }>;
  marca: {
    nombre: string;
  };
}

/* ===============================
   Componente
================================ */
export const FeaturedTrucks = () => {
  const [trucks, setTrucks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/camiones")
      .then(r => r.json())
      .then((data: TruckAPI[]) => {
        const destacados = data
          // .filter(t => t.estado === "publicado")
          .slice(0, 4)
          .map(t => ({
            id: String(t.id),
            image:
              t.imagen_principal_url ??
              t.imagenes?.[0]?.url ??
              (t.imagen_principal ? `http://127.0.0.1:8000/${t.imagen_principal}` : "/no-image.jpg"),
            brand: t.marca.nombre,
            model: `Modelo ${t.id}`,
            year: Number(t.anio),
            price: Number(t.precio),
            mileage: Number(t.kilometros),
            location: t.ubicacion ?? "Sin ubicación",
            fuelType: t.combustible,
            condition: t.condicion === "nuevo" ? "new" : "used",
            featured: true,
          }));

        setTrucks(destacados);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Catálogo
            </span>
            <h2 className="section-title mt-2">
              Camiones <span className="text-accent">Destacados</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              Unidades verificadas y con garantía.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="ghost" className="text-accent">
              Ver todos
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trucks.map((truck, index) => (
            <div key={truck.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <TruckCard {...truck} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/catalogo">
            <Button variant="steel" size="lg" className="font-display">
            Cargar más camiones
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

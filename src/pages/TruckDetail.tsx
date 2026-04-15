import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import TruckLoader from "@/components/TruckLoader";

import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Phone,
} from "lucide-react";

/* ===========================
   Tipo backend
=========================== */
interface TruckDetailAPI {
  id: number;
  modelo_id?: string;
  modelo?: {
    nombre: string;
  } | null;
  anio: string;
  precio: string;
  kilometros: string;
  ubicacion: string | null;
  condicion: string;
  combustible: string;
  transmision: string;
  motor: string | null;
  ejes: string | null;
  suspension: string | null;
  cabina: string | null;
  peso_bruto: string | null;
  distancia_ejes: string | null;
  capacidad_tanque: string | null;
  imagen_principal: string | null;
  imagen_principal_url: string | null;
  imagenes?: Array<{
    id: number;
    url: string;
    posicion: string;
  }>;
  descripcion: string;
  marca: {
    nombre: string;
  };
}

/* ===========================
   Pagina
=========================== */
export default function TruckDetail() {
  const { id } = useParams();

  const [truck, setTruck] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  /* ===========================
     Fetch camion
  ============================ */
  useEffect(() => {
    fetch(`/api/camiones/${id}`)
      .then(r => r.json())
      .then((t: TruckDetailAPI) => {
        const primaryImage =
          t.imagen_principal_url ??
          (t.imagen_principal ? `http://127.0.0.1:8000/${t.imagen_principal}` : null);

        const rawImages = [
          primaryImage,
          ...(Array.isArray(t.imagenes) ? t.imagenes.map((img: any) => img.url) : []),
        ].filter(Boolean) as string[];
        const galleryImages = Array.from(new Set(rawImages));

        const normalizado = {
          id: t.id,
          brand: t.marca.nombre,
          model: t.modelo?.nombre ?? t.modelo_id ?? `Modelo ${t.id}`,
          year: Number(t.anio),
          price: Number(t.precio),
          mileage: Number(t.kilometros),
          location: t.ubicacion ?? "Sin ubicacion",
          fuelType: t.combustible,
          condition: t.condicion === "nuevo" ? "new" : "used",
          description: t.descripcion,
          images: galleryImages.length ? galleryImages : ["/no-image.jpg"],
          specs: {
            engine: t.motor ?? "No informado",
            transmission: t.transmision ?? "No informado",
            axles: t.ejes ?? "No informado",
            suspension: t.suspension ?? "No informado",
            cabin: t.cabina ?? "No informado",
            gvw: t.peso_bruto ?? "No informado",
            wheelbase: t.distancia_ejes ?? "No informado",
            fuelCapacity: t.capacidad_tanque ?? "No informado",
          },
          features: [],
        };

        setTruck(normalizado);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando camion", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <TruckLoader />;
  if (!truck) return <p className="p-10">Camion no encontrado</p>;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price);

  const formatMileage = (km: number) =>
    new Intl.NumberFormat("es-AR").format(km);

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % truck.images.length);

  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + truck.images.length) % truck.images.length);

  /* ===========================
     Render
  ============================ */
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Galeria + info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Imagen */}
            <div className="relative rounded-xl overflow-hidden bg-steel-dark">
              <div className="aspect-[16/10] relative">
                <img src={truck.images[currentImage]} className="w-full h-full object-cover" />

                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80">
                  <ChevronLeft />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80">
                  <ChevronRight />
                </button>
              </div>
            </div>
            {truck.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {truck.images.map((img: string, idx: number) => (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => setCurrentImage(idx)}
                    className={`aspect-[4/3] rounded-lg overflow-hidden border ${
                      idx === currentImage ? "border-accent" : "border-transparent"
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Titulo */}
            <div className="card-truck p-6">
              <h1 className="text-3xl font-display font-bold">{truck.brand} {truck.model}</h1>
              <p className="text-xl text-accent">{formatPrice(truck.price)}</p>
            </div>

            {/* Specs */}
            <div className="card-truck p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><Calendar /> {truck.year}</div>
              <div><Gauge /> {formatMileage(truck.mileage)} km</div>
              <div><Fuel /> {truck.fuelType}</div>
              <div><MapPin /> {truck.location}</div>
            </div>

            {/* Descripcion */}
            <div className="card-truck p-6">
              {truck.description}
            </div>

            {/* Tecnico */}
          {/* Tecnico
          <div className="card-truck p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {truck?.specs &&
              Object.entries(truck.specs).map(([k, v]) => (
                <div key={k} className="p-3 rounded bg-steel-dark">
                  {v}
                </div>
              */
            }
            </div>

          {/* Contacto */}
          <div className="card-truck p-6 sticky top-24 space-y-4">
            <h2 className="text-2xl font-display font-bold">Consultanos por esta unidad</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Te acompañamos con atención personalizada y transparente para ayudarte a encontrar la mejor opción según tu necesidad.
            </p>

            <div className="rounded-xl border border-border p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="font-medium">+54 9 11 66414662</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                Buenos Aires, Argentina
              </div>
            </div>

            <Button asChild className="w-full">
              <a href="tel:+5491166414662">Llamar ahora</a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}



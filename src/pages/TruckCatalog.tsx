import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  Filter,
  MapPin,
  Gauge,
  Calendar
} from "lucide-react";

/* ===============================
   Tipos del backend
================================ */
interface TruckAPI {
  id: number;
  modelo: string;
  anio: number;
  precio: number;
  kilometros: number;
  ubicacion: string | null;
  combustible: string;
  condicion: "new" | "used";
  imagen: string;
  marca: {
    nombre: string;
  };
}

/* ===============================
   PÃ¡gina
================================ */
export default function TruckCatalog() {
  const [searchParams] = useSearchParams();
  const [trucksData, setTrucksData] = useState<TruckAPI[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultFilters = {
    search: "",
    brand: "",
    condition: "",
    yearRange: [2000, 2025],
    mileageRange: [0, 500000],
    priceRange: [0, 100000000],
  };

  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));
    const parseNumber = (value: string | null) => {
      if (value === null || value.trim() === "") return null;
      const num = Number(value);
      return Number.isFinite(num) ? num : null;
    };

    const brand = searchParams.get("brand") ?? "";
    const condition = searchParams.get("condition") ?? "";
    const search = searchParams.get("search") ?? "";
    const year = parseNumber(searchParams.get("year"));
    const mileage = parseNumber(searchParams.get("mileage"));

    setFilters({
      ...defaultFilters,
      brand,
      condition,
      search,
      yearRange:
        year !== null
          ? [clamp(year, 2000, 2025), clamp(year, 2000, 2025)]
          : defaultFilters.yearRange,
      mileageRange:
        mileage !== null
          ? [0, clamp(mileage, 0, 500000)]
          : defaultFilters.mileageRange,
    });
  }, [searchParams]);

  /* ===============================
     Fetch backend
  ================================ */
  useEffect(() => {
    fetch("/api/camiones")
      .then(r => r.json())
      .then((data) => {
        const normalizados = data.map((t: any) => ({
          id: t.id,
          modelo: t.modelo?.nombre ?? t.modelo_id ?? `Modelo ${t.id}`,
          anio: Number(t.anio),
          precio: Number(t.precio),
          kilometros: Number(t.kilometros),
          ubicacion: t.ubicacion ?? "Sin ubicacion",
          combustible: t.combustible,
          condicion: t.condicion === "nuevo" ? "new" : "used",
          imagen:
            t.imagen_principal_url ??
            t.imagenes?.[0]?.url ??
            "/no-image.jpg",
          marca: {
            nombre: t.marca.nombre
          }
        }));

        setTrucksData(normalizados);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando camiones", err);
        setLoading(false);
      });
  }, []);

  /* ===============================
     Filtros
  ================================ */
  const filteredTrucks = trucksData.filter((truck) => {
    const matchSearch =
      filters.search === "" ||
      `${truck.marca.nombre} ${truck.modelo}`.toLowerCase().includes(filters.search.toLowerCase());

    const matchBrand =
      filters.brand === "" || truck.marca.nombre === filters.brand;

    const matchCondition =
      filters.condition === "" || truck.condicion === filters.condition;

    const matchYear =
      truck.anio >= filters.yearRange[0] &&
      truck.anio <= filters.yearRange[1];

    const matchMileage =
      truck.kilometros >= filters.mileageRange[0] &&
      truck.kilometros <= filters.mileageRange[1];

    const matchPrice =
      truck.precio >= filters.priceRange[0] &&
      truck.precio <= filters.priceRange[1];

    return matchSearch && matchBrand && matchCondition && matchYear && matchMileage && matchPrice;
  });

  /* ===============================
     Render
  ================================ */
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* SIDEBAR */}
          <aside className="card-truck p-6 h-fit sticky top-24">
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <Filter className="h-5 w-5 text-accent" />
              Filtros
            </h2>

            <Input
              placeholder="Buscar marca o modelo..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="mb-4 border-border"
            />

            <label className="text-sm text-muted-foreground">Marca</label>
            <select
              className="w-full p-2 rounded-lg  border border-border mb-4"
              value={filters.brand}
              onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
            >
              <option value="">Todas</option>
              {[...new Set(trucksData.map(t => t.marca.nombre))].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <label className="text-sm text-muted-foreground">Estado</label>
            <select
              className="w-full p-2 rounded-lg  border border-border mb-4"
              value={filters.condition}
              onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
            >
              <option value="">Ambos</option>
              <option value="new">Nuevo</option>
              <option value="used">Usado</option>
            </select>

            <p className="text-sm text-muted-foreground">Año</p>
            <Slider
              value={filters.yearRange}
              min={2000}
              max={2025}
              step={1}
              minStepsBetweenThumbs={1}
              onValueChange={(v) => setFilters({ ...filters, yearRange: v })}
            />

            <div className="flex justify-between text-sm mt-1 mb-4">
              <span>{filters.yearRange[0]}</span>
              <span>{filters.yearRange[1]}</span>
            </div>

            <p className="text-sm text-muted-foreground mt-4">Kilometraje</p>
            <Slider
              value={filters.mileageRange}
              min={0}
              max={500000}
              step={5000}
              minStepsBetweenThumbs={1}
              onValueChange={(v) => setFilters({ ...filters, mileageRange: v })}
            />

            <div className="flex justify-between text-sm mt-1 mb-4">
              <span>{filters.mileageRange[0].toLocaleString()} km</span>
              <span>{filters.mileageRange[1].toLocaleString()} km</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Precio</p>
            <Slider
              value={filters.priceRange}
              min={0}
              max={100000000}
              step={500000}
              minStepsBetweenThumbs={1}
              onValueChange={(v) => setFilters({ ...filters, priceRange: v })}
            />

            <div className="flex justify-between text-sm mt-1 mb-4">
              <span>USD {filters.priceRange[0].toLocaleString()}</span>
              <span>USD {filters.priceRange[1].toLocaleString()}</span>
            </div>

            <Button variant="industrial" className="w-full mt-6">
              Aplicar filtros
            </Button>
          </aside>

          {/* GRID */}
          <section className="lg:col-span-3">
            <h1 className="text-3xl font-display font-bold mb-6">Catalogo de Camiones</h1>

            {loading && <p>Cargando camiones...</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTrucks.map(truck => (
                <div key={truck.id} className="card-truck overflow-hidden group cursor-pointer">
                  <Link to={`/camion/${truck.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={truck.imagen}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all"
                      />
                      {truck.condicion === "new" && (
                        <span className="absolute top-2 left-2 px-3 py-1 bg-emerald-600 text-white text-xs rounded-full">
                          Nuevo
                        </span>
                      )}
                    </div>

                    <div className="p-5 space-y-2">
                      <p className="text-accent text-sm font-semibold">{truck.marca.nombre}</p>
                      <h3 className="text-2xl font-display font-bold">{truck.modelo}</h3>

                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {truck.anio}
                        <Gauge className="h-4 w-4 ml-3" />
                        {truck.kilometros.toLocaleString()} km
                      </div>

                      <p className="text-xl font-bold text-accent mt-2">
                        USD {truck.precio.toLocaleString()}
                      </p>

                      <div className="flex items-center gap-2 text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4" />
                        {truck.ubicacion}
                      </div>

                      <Button variant="industrial" className="w-full mt-4">
                        Ver Detalle
                      </Button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {!loading && filteredTrucks.length === 0 && (
              <p className="text-center text-muted-foreground mt-10">
                No se encontraron camiones con los filtros seleccionados.
              </p>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}



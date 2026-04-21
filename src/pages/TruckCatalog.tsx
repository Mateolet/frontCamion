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
  Calendar,
  SlidersHorizontal,
  X
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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);

  const MAX_PRICE = 500000000;

  const defaultFilters = {
    search: "",
    brand: "",
    condition: "",
    yearRange: [2000, 2026],
    mileageRange: [0, 800000],
    priceRange: [0, MAX_PRICE],
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
          ubicacion: t.ubicacion ?? "Sin ubicación",
          combustible: t.combustible,
          condicion: t.condicion === "nuevo" ? "new" : "used",
          imagen:
            t.imagen_principal_url ??
            t.imagenes?.[0]?.url ??
            "/no-image.jpg",
          marca: {
            nombre: t.marca?.nombre ?? "Sin marca"
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

      <main className="container mx-auto px-4 py-6 md:py-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase text-accent">Catálogo</span>
            <h1 className="mt-1 text-3xl font-display font-bold leading-tight md:text-4xl">
              Camiones disponibles
            </h1>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full justify-center sm:w-auto lg:hidden"
            onClick={() => setShowMobileFilters((current) => !current)}
          >
            {showMobileFilters ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
            {showMobileFilters ? "Cerrar filtros" : "Filtrar catálogo"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
          <aside
            className={`card-truck h-fit p-5 lg:sticky lg:top-24 lg:block ${
              showMobileFilters ? "block" : "hidden"
            }`}
          >
            <h2 className="mb-4 flex items-center gap-2 text-xl font-display font-bold">
              <Filter className="h-5 w-5 text-accent" />
              Filtros
            </h2>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar marca o modelo..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="border-border pl-9"
              />
            </div>

            <label className="text-sm text-muted-foreground">Marca</label>
            <select
              className="mb-4 mt-1 w-full rounded-lg border border-border bg-card p-3 text-sm"
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
              className="mb-4 mt-1 w-full rounded-lg border border-border bg-card p-3 text-sm"
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

            <div className="mt-1 mb-4 flex justify-between text-sm">
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

            <div className="mt-1 mb-4 flex justify-between text-sm">
              <span>{filters.mileageRange[0].toLocaleString()} km</span>
              <span>{filters.mileageRange[1].toLocaleString()} km</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Precio</p>
            <Slider
              value={filters.priceRange}
              min={0}
              max={MAX_PRICE}
              step={500000}
              minStepsBetweenThumbs={1}
              onValueChange={(v) => setFilters({ ...filters, priceRange: v })}
            />

            <div className="mt-1 mb-4 flex justify-between gap-3 text-xs sm:text-sm">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>

            <Button
              type="button"
              variant="industrial"
              className="mt-6 w-full"
              onClick={() => setShowMobileFilters(false)}
            >
              Aplicar filtros
            </Button>
          </aside>

          <section className="min-w-0">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {loading ? "Cargando camiones..." : `${filteredTrucks.length} unidades encontradas`}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTrucks.map(truck => (
                <article key={truck.id} className="card-truck group overflow-hidden">
                  <Link to={`/camion/${truck.id}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={truck.imagen}
                        alt={`${truck.marca.nombre} ${truck.modelo}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {truck.condicion === "new" && (
                        <span className="absolute left-3 top-3 rounded-md bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                          Nuevo
                        </span>
                      )}
                    </div>

                    <div className="space-y-3 p-4 sm:p-5">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold uppercase text-accent">{truck.marca.nombre}</p>
                        <h3 className="mt-1 break-words text-2xl font-display font-bold leading-tight text-foreground">
                          {truck.modelo}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                        <span className="flex min-w-0 items-center gap-2">
                          <Calendar className="h-4 w-4 shrink-0 text-steel-light" />
                          {truck.anio}
                        </span>
                        <span className="flex min-w-0 items-center gap-2">
                          <Gauge className="h-4 w-4 shrink-0 text-steel-light" />
                          <span className="truncate">{truck.kilometros.toLocaleString()} km</span>
                        </span>
                      </div>

                      <p className="text-xl font-bold text-accent">
                        {formatPrice(truck.precio)}
                      </p>

                      <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="truncate">{truck.ubicacion}</span>
                      </div>

                      <span className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all duration-300 group-hover:shadow-glow">
                        Ver Detalle
                      </span>
                    </div>
                  </Link>
                </article>
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



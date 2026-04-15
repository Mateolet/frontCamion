import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-truck.jpg";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (year) params.set("year", year);
    if (mileage) params.set("mileage", mileage);
    const query = params.toString();
    navigate(`/catalogo${query ? `?${query}` : ""}`);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Camión profesional en carretera"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-dark/95 via-steel-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-steel-dark/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-3xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/40 rounded-full backdrop-blur-sm animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-accent">
              Más de 30 años de trayectoria
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight animate-slide-up">
            Camiones y acoplados <br />
            <span className="text-accent">con respaldo real</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-secondary max-w-2xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Somos una empresa familiar con más de 30 años de experiencia en la venta de camiones y acoplados.
            Trabajamos con esfuerzo, honestidad y compromiso para brindarte un asesoramiento cercano, personalizado y transparente.
          </p>

          {/* Search Box */}
          <div className="bg-card/95 backdrop-blur-md rounded-xl p-6 shadow-industrial-lg animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Marca
                </label>
                <select
                  className="input-industrial"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="">Todas las marcas</option>
                  <option value="Volvo">Volvo</option>
                  <option value="Scania">Scania</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="MAN">MAN</option>
                  <option value="DAF">DAF</option>
                  <option value="Iveco">Iveco</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Año
                </label>
                <select
                  className="input-industrial"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Cualquier año</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  Kilometraje
                </label>
                <select
                  className="input-industrial"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                >
                  <option value="">Sin límite</option>
                  <option value="50000">Hasta 50.000 km</option>
                  <option value="100000">Hasta 100.000 km</option>
                  <option value="200000">Hasta 200.000 km</option>
                  <option value="300000">Hasta 300.000 km</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="industrial"
                  className="w-full h-12 font-display text-base"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>

            {/* Quick filters */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {["Tractocamiones", "Volquetas", "Furgones", "Grúas"].map((tag) => (
                <button
                  key={tag}
                  className="tag-steel hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {[
              { value: "500+", label: "Unidades" },
              { value: "30+", label: "Años de experiencia" },
              { value: "98%", label: "Confianza" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-display font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

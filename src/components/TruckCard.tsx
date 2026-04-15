import { Heart, MapPin, Gauge, Calendar, Fuel, ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

interface TruckCardProps {
  id: string;
  image: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  fuelType: string;
  condition: "new" | "used";
  featured?: boolean;
}

export const TruckCard = ({
  id,
  image,
  brand,
  model,
  year,
  price,
  mileage,
  location,
  fuelType,
  condition,
  featured = false,
}: TruckCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (km: number) => {
    return new Intl.NumberFormat("es-AR").format(km);
  };

  return (
    <article className="card-truck group">
      {/* Image container */}
      <Link to={`/camion/${id}`} className="relative aspect-[4/3] overflow-hidden block">
        <img
          src={image}
          alt={`${brand} ${model} ${year}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-steel-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {featured && (
            <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full shadow-glow">
              DESTACADO
            </span>
          )}
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
            condition === "new" 
              ? "bg-emerald-500 text-white" 
              : "bg-steel-medium text-secondary"
          }`}>
            {condition === "new" ? "NUEVO" : "USADO"}
          </span>
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
            isFavorite 
              ? "bg-accent text-accent-foreground" 
              : "bg-card/80 backdrop-blur-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        {/* Quick view on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Button variant="industrial" className="w-full font-display pointer-events-none">
            Ver Detalles
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Brand and Model */}
        <div>
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {brand}
          </span>
          <h3 className="text-lg font-display font-bold text-card-foreground mt-1 group-hover:text-accent transition-colors">
            {model}
          </h3>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-steel-light" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Gauge className="h-4 w-4 text-steel-light" />
            <span>{formatMileage(mileage)} km</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Fuel className="h-4 w-4 text-steel-light" />
            <span>{fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-steel-light" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-display font-bold text-card-foreground">
              {formatPrice(price)}
            </span>
            <span className="text-xs text-muted-foreground block">+ IVA</span>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link to={`/camion/${id}`}>
              <Truck className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

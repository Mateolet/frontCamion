import { Link } from "react-router-dom";
import { Truck, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();



  return (
    <footer className="bg-steel-dark text-secondary">
      {/* Main Footer */}
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 justify-items-center md:justify-items-start text-center md:text-left">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-accent rounded-lg">
                <Truck className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-display font-bold tracking-wide">
                TRUCK<span className="text-accent">MARKET</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs md:max-w-sm mx-auto md:mx-0">
              La plataforma líder en compra-venta de camiones en Latinoamérica. 
              Conectamos compradores y vendedores desde 2014.
            </p>
            <div className="space-y-3">
              <a href="tel:+18007782257" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                <Phone className="h-4 w-4 text-accent" />
                +1 800 TRUCKS
              </a>
              <a href="mailto:info@truckmarket.com" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                <Mail className="h-4 w-4 text-accent" />
                info@truckmarket.com
              </a>
              <span className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-accent" />
                Buenos Aires, Argentina
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-steel-medium">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © {currentYear} TruckMarket. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-full hover:bg-steel-medium transition-colors">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-steel-medium transition-colors">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-steel-medium transition-colors">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-steel-medium transition-colors">
              <Youtube className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

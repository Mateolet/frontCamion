import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Truck, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Referencias", href: "/referencias" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-industrial-md">
      {/* Main nav */}
      <nav className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-accent rounded-lg group-hover:shadow-glow transition-shadow">
            <Truck className="h-7 w-7 text-accent-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold text-primary-foreground tracking-wide">
              LOGI<span className="text-accent">BAL</span>
            </span>
            <span className="text-[10px] text-secondary uppercase tracking-widest">
              Camiones y Acoplados
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-secondary font-medium hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>


        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-secondary hover:text-accent transition-colors"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-steel-dark border-t border-steel-medium animate-fade-in">
          <div className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-2 text-secondary hover:text-accent transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild variant="industrial" className="w-full font-display mt-4">
              <Link to="/referencias">Ver referencias</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

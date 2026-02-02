import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Contact request failed");
      }

      setStatus("success");
      setFormData({
        nombre: "",
        empresa: "",
        email: "",
        telefono: "",
        mensaje: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Contacto
            </span>
            <h1 className="section-title mt-2">
              Hablemos de tu proximo camion
            </h1>
            <p className="text-muted-foreground mt-3">
              Completa el formulario y un asesor se pondra en contacto. Tambien
              podes escribirnos o llamarnos directo.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="card-truck p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefono</p>
                  <p className="font-semibold text-foreground">+1 800 TRUCKS</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">
                    info@truckmarket.com
                  </p>
                </div>
              </div>
            </div>

            <div className="card-truck p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sucursal</p>
                  <p className="font-semibold text-foreground">
                    Buenos Aires, Argentina
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horario</p>
                  <p className="font-semibold text-foreground">
                    Lun a Vie, 9:00 a 18:00
                  </p>
                </div>
              </div>
            </div>

            <div className="card-truck p-6">
              <h3 className="text-lg font-display font-bold mb-3">
                Atencion comercial
              </h3>
              <p className="text-sm text-muted-foreground">
                Si sos concesionario o flota, tenemos planes corporativos.
                Escribinos y armamos una propuesta a medida.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 card-truck p-6">
            <h2 className="text-2xl font-display font-bold mb-6">
              Envia tu consulta
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Nombre</label>
                <input
                  type="text"
                  className="input-industrial"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={(event) =>
                    setFormData({ ...formData, nombre: event.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Empresa</label>
                <input
                  type="text"
                  className="input-industrial"
                  placeholder="Tu empresa"
                  value={formData.empresa}
                  onChange={(event) =>
                    setFormData({ ...formData, empresa: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Email</label>
                <input
                  type="email"
                  className="input-industrial"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Telefono</label>
                <input
                  type="tel"
                  className="input-industrial"
                  placeholder="+54 11 1234 5678"
                  value={formData.telefono}
                  onChange={(event) =>
                    setFormData({ ...formData, telefono: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-muted-foreground">Mensaje</label>
                <textarea
                  className="input-industrial min-h-[140px]"
                  placeholder="Contanos que camion estas buscando"
                  value={formData.mensaje}
                  onChange={(event) =>
                    setFormData({ ...formData, mensaje: event.target.value })
                  }
                  required
                />
              </div>
              <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Te respondemos dentro de las proximas 24 hs habiles.
                </p>
                <Button variant="industrial" className="font-display" disabled={status === "loading"}>
                  {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </div>
              {status === "success" && (
                <p className="text-sm text-emerald-600 md:col-span-2">
                  Gracias, recibimos tu mensaje. Te contactamos pronto.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-500 md:col-span-2">
                  No pudimos enviar tu mensaje. Intenta nuevamente.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

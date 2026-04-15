import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type ReferenciaPublicacion =
  | string
  | {
      nombre?: string | null;
      titulo?: string | null;
      descripcion?: string | null;
      modelo?: { nombre?: string | null } | null;
      marca?: { nombre?: string | null } | null;
    }
  | null;

type ReferenciaAPI = {
  id: number;
  publicacion: ReferenciaPublicacion;
  imagenes: string[];
  descripcion?: string | null;
  created_at: string;
  updated_at: string;
};

const pageSize = 6;

const getPublicationName = (publicacion: ReferenciaPublicacion) => {
  if (typeof publicacion === "string") return publicacion;
  if (!publicacion) return "Cliente Logi Bal";

  const marca = publicacion.marca?.nombre?.trim();
  const modelo = publicacion.modelo?.nombre?.trim();
  const nombre = publicacion.nombre?.trim();
  const titulo = publicacion.titulo?.trim();

  if (nombre) return nombre;
  if (titulo) return titulo;
  if (marca || modelo) return [marca, modelo].filter(Boolean).join(" ");

  return "Cliente Logi Bal";
};

const getReferenceDescription = (referencia: ReferenciaAPI) => {
  const directDescription = referencia.descripcion?.trim();
  if (directDescription) return directDescription;

  if (referencia.publicacion && typeof referencia.publicacion === "object") {
    const publicationDescription = referencia.publicacion.descripcion?.trim();
    if (publicationDescription) return publicationDescription;
  }

  return "Operación acompañada con seguimiento profesional, coordinación responsable y foco en el cumplimiento.";
};

export default function Referencias() {
  const [referencias, setReferencias] = useState<ReferenciaAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleReferences, setVisibleReferences] = useState<number[]>([]);
  const [activeImageByReference, setActiveImageByReference] = useState<Record<number, number>>({});
  const cardRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  useEffect(() => {
    fetch("/api/referencias")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("No se pudieron cargar las referencias.");
        }

        return response.json();
      })
      .then((data: ReferenciaAPI[]) => {
        setReferencias(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((fetchError: Error) => {
        setError(fetchError.message || "Ocurrió un error al cargar las referencias.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [referencias.length]);

  const totalPages = Math.max(1, Math.ceil(referencias.length / pageSize));
  const currentReferences = referencias.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const setActiveImage = (referenceId: number, imageIndex: number) => {
    setActiveImageByReference((current) => ({
      ...current,
      [referenceId]: imageIndex,
    }));
  };

  const moveImage = (referenceId: number, imageCount: number, direction: "previous" | "next") => {
    setActiveImageByReference((current) => {
      const currentIndex = current[referenceId] ?? 0;
      const nextIndex =
        direction === "next"
          ? (currentIndex + 1) % imageCount
          : (currentIndex - 1 + imageCount) % imageCount;

      return {
        ...current,
        [referenceId]: nextIndex,
      };
    });
  };

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisibleReferences(currentReferences.map((referencia) => referencia.id));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = Number((entry.target as HTMLElement).dataset.referenceId);
          setVisibleReferences((current) => (current.includes(id) ? current : [...current, id]));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 },
    );

    currentReferences.forEach((referencia) => {
      const element = cardRefs.current[referencia.id];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [currentReferences]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="border-b border-border bg-gradient-to-br from-primary via-steel-medium to-steel-dark text-primary-foreground">
          <div className="container mx-auto px-4 py-9 md:py-11">
            <div className="grid gap-5 md:grid-cols-[1fr_0.55fr] md:items-end">
              <div className="max-w-4xl animate-slide-up">
                <span className="inline-flex rounded-md border border-accent/35 bg-accent/15 px-4 py-2 text-xs font-semibold uppercase text-accent">
                  Referencias comerciales
                </span>
                <h1 className="mt-4 text-3xl font-display font-bold leading-tight md:text-5xl">
                  Empresas que confían en Logi Bal
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary md:text-lg">
                  Acompañamos a empresas que necesitan mover unidades, cumplir tiempos y sostener operaciones
                  logísticas con respaldo profesional. Cada referencia refleja compromiso, coordinación y una
                  forma de trabajar orientada a resultados.
                </p>
              </div>

              <div className="rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 p-5 shadow-industrial-sm backdrop-blur-sm">
                <p className="text-sm font-semibold uppercase text-accent">Confianza en movimiento</p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  Mirá algunos trabajos realizados y conocé cómo Logi Bal acompaña a sus clientes en operaciones
                  reales.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 md:py-10">
          {loading && (
            <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground shadow-industrial-sm">
              Cargando referencias...
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-destructive/25 bg-card p-8 text-center text-destructive shadow-industrial-sm">
              {error}
            </div>
          )}

          {!loading && !error && referencias.length === 0 && (
            <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground shadow-industrial-sm">
              Todavía no hay referencias publicadas.
            </div>
          )}

          {!loading && !error && referencias.length > 0 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {currentReferences.map((referencia, index) => {
                  const publicationName = getPublicationName(referencia.publicacion);
                  const description = getReferenceDescription(referencia);
                  const images = referencia.imagenes.slice(0, 4);
                  const coverImage = images[0];
                  const activeImageIndex = Math.min(activeImageByReference[referencia.id] ?? 0, images.length - 1);
                  const activeImage = images[activeImageIndex];
                  const isVisible = visibleReferences.includes(referencia.id);

                  return (
                    <Dialog
                      key={referencia.id}
                      onOpenChange={(open) => {
                        if (open) setActiveImage(referencia.id, 0);
                      }}
                    >
                      <DialogTrigger asChild>
                        <button
                          ref={(element) => {
                            cardRefs.current[referencia.id] = element;
                          }}
                          type="button"
                          data-reference-id={referencia.id}
                          className={`group overflow-hidden rounded-lg border border-border bg-card text-left shadow-industrial-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-industrial-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                          }`}
                          style={{ transitionDelay: `${Math.min(index * 60, 240)}ms` }}
                        >
                          {coverImage && (
                            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                              <img
                                src={coverImage}
                                alt={publicationName}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                loading="lazy"
                              />

                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-steel-dark/85 to-transparent p-4">
                                <div className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                                  <Eye className="h-3.5 w-3.5" />
                                  Ver referencia
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="p-4">
                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-accent">
                              <ShieldCheck className="h-4 w-4" />
                              Cliente Logi Bal
                            </div>
                            <h2 className="line-clamp-2 text-xl font-display font-bold leading-tight text-foreground">
                              {publicationName}
                            </h2>
                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                              {description}
                            </p>
                          </div>
                        </button>
                      </DialogTrigger>

                      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto p-0">
                        <div className={images.length > 0 ? "grid gap-0 lg:grid-cols-[1.35fr_0.65fr]" : ""}>
                          {images.length > 0 && (
                            <div className="bg-steel-dark/5 p-3">
                              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
                                {activeImage && (
                                  <img
                                    src={activeImage}
                                    alt={`${publicationName} - imagen ${activeImageIndex + 1}`}
                                    className="h-full w-full object-cover"
                                  />
                                )}

                                {images.length > 1 && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => moveImage(referencia.id, images.length, "previous")}
                                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md bg-steel-dark/80 text-primary-foreground transition-colors hover:bg-accent"
                                      aria-label="Imagen anterior"
                                    >
                                      <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => moveImage(referencia.id, images.length, "next")}
                                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md bg-steel-dark/80 text-primary-foreground transition-colors hover:bg-accent"
                                      aria-label="Imagen siguiente"
                                    >
                                      <ChevronRight className="h-5 w-5" />
                                    </button>
                                  </>
                                )}
                              </div>

                              {images.length > 1 && (
                                <div className="mt-3 grid grid-cols-4 gap-2">
                                  {images.map((imagen, imageIndex) => (
                                    <button
                                      key={`${referencia.id}-thumb-${imageIndex}`}
                                      type="button"
                                      onClick={() => setActiveImage(referencia.id, imageIndex)}
                                      className={`aspect-[4/3] overflow-hidden rounded-md border transition-all ${
                                        activeImageIndex === imageIndex
                                          ? "border-accent opacity-100"
                                          : "border-transparent opacity-70 hover:opacity-100"
                                      }`}
                                      aria-label={`Ver imagen ${imageIndex + 1}`}
                                    >
                                      <img
                                        src={imagen}
                                        alt={`${publicationName} miniatura ${imageIndex + 1}`}
                                        className="h-full w-full object-cover"
                                      />
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          <div className="p-6 lg:p-7">
                            <DialogHeader>
                              <span className="text-sm font-semibold uppercase text-accent">
                                Referencia Logi Bal
                              </span>
                              <DialogTitle className="text-3xl font-display leading-tight text-foreground">
                                {publicationName}
                              </DialogTitle>
                              <DialogDescription className="sr-only">
                                Detalle de referencia con imágenes y descripción del cliente.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="mt-5 border-t border-border pt-5">
                              <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                                {description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          setCurrentPage((page) => Math.max(1, page - 1));
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === currentPage}
                          onClick={(event) => {
                            event.preventDefault();
                            setCurrentPage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          setCurrentPage((page) => Math.min(totalPages, page + 1));
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

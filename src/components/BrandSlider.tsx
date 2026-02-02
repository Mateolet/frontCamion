import { useEffect, useState } from "react";

interface BrandAPI {
  id?: number;
  nombre?: string;
  name?: string;
  logo?: string;
}

export const BrandSlider = () => {
  const [brands, setBrands] = useState<Array<{ name: string; logo: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const uniq = (items: string[]) => Array.from(new Set(items));
    const toBrandName = (item: BrandAPI) =>
      (item?.nombre ?? item?.name ?? item?.logo ?? "").trim();

    const normalizeBrands = (data: BrandAPI[]) =>
      uniq(data.map(toBrandName).filter(Boolean)).map(name => ({
        name,
        logo: name.toUpperCase(),
      }));

    const fetchBrands = async () => {
      try {
        const res = await fetch("/api/marcas");
        if (!res.ok) throw new Error("Brands request failed");
        const data = await res.json();
        const list = Array.isArray(data)
          ? normalizeBrands(data)
          : normalizeBrands(data?.results ?? data?.data ?? []);
        if (!cancelled && list.length) {
          setBrands(list);
          setLoading(false);
          return;
        }
      } catch {
        // Fallback to brands derived from trucks
      }

      try {
        const res = await fetch("/api/camiones");
        if (!res.ok) throw new Error("Trucks request failed");
        const data = await res.json();
        const list = Array.isArray(data)
          ? uniq(
              data
                .map((t: any) => t?.marca?.nombre)
                .filter((name: string) => typeof name === "string" && name.trim())
            ).map(name => ({ name, logo: name.toUpperCase() }))
          : [];
        if (!cancelled) {
          setBrands(list);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchBrands();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || brands.length === 0) return null;

  return (
    <section className="py-12 bg-muted border-y border-border">
      <div className="container">
        <div className="text-center mb-8">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Trabajamos con las mejores marcas
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group cursor-pointer"
            >
              <span className="text-xl md:text-2xl font-display font-bold text-muted-foreground/50 group-hover:text-accent transition-colors duration-300">
                {brand.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

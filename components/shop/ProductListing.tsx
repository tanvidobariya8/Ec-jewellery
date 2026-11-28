import Link from "next/link";

import { Pagination } from "@/components/shop/Pagination";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { Button } from "@/components/ui/Button";
import { getCategories, getProducts, getShapes, getStyles } from "@/lib/api/catalog";
import { whatsappLink } from "@/lib/constants";
import type { ShopFilters as Filters } from "@/lib/search-params/shop";

type ProductListingProps = {
  /** Breadcrumb + page title (ShopTitle). */
  title: React.ReactNode;
  basePath: string;
  filters: Filters;
  /** Set on category pages: fixes the category and hides its filter. */
  category?: string;
};

/** Filter sidebar + product grid + pagination for /shop and /shop/[category]. */
export async function ProductListing({ title, basePath, filters, category }: ProductListingProps) {
  const query = category ? { ...filters, category } : filters;
  const [products, categories, shapes, styles] = await Promise.all([
    getProducts(query),
    getCategories(),
    getShapes(),
    getStyles(),
  ]);

  const toOptions = (rows: { slug: string; name: string }[]) =>
    rows.map((row) => ({ value: row.slug, label: row.name }));

  return (
    <ShopFilters
      title={title}
      categories={toOptions(categories)}
      shapeTiles={shapes.map((shape) => ({
        slug: shape.slug,
        name: shape.name,
        image: shape.image ?? null,
        description: shape.description ?? null,
      }))}
      styles={toOptions(styles)}
      showCategory={!category}
      total={products.total}
    >
      {products.items.length > 0 ? (
        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 xl:grid-cols-4">
          {products.items.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl">No designs match these filters</p>
          <p className="mt-3 text-sm text-muted">
            Try removing a filter — or ask us to create it for you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link href={basePath}>Clear filters</Link>
            </Button>
            <Button asChild>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                Ask us on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      )}

      <Pagination
        basePath={basePath}
        filters={filters}
        page={products.page}
        totalPages={products.totalPages}
      />
    </ShopFilters>
  );
}

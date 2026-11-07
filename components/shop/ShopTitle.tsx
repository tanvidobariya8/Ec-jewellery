import Link from "next/link";

type ShopTitleProps = {
  title: string;
  /** Breadcrumb trail before the current page. */
  crumbs: { label: string; href: string }[];
};

/** Compact breadcrumb + page title shown above the shop filters and grid. */
export function ShopTitle({ title, crumbs }: ShopTitleProps) {
  return (
    <div className="mb-8">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          {crumbs.map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-1.5">
              <Link href={crumb.href} className="transition-colors duration-300 hover:text-primary">
                {crumb.label}
              </Link>
              <span aria-hidden="true">/</span>
            </li>
          ))}
          <li aria-current="page" className="text-foreground">
            {title}
          </li>
        </ol>
      </nav>
      <h1 className="mt-3 font-serif text-3xl text-primary">{title}</h1>
    </div>
  );
}

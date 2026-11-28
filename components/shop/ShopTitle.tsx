import Link from "next/link";

type ShopTitleProps = {
  title: string;
  /** Breadcrumb trail before the current page. */
  crumbs: { label: string; href: string }[];
};

/** Breadcrumb above the shop filters, with a visually hidden page title (h1). */
export function ShopTitle({ title, crumbs }: ShopTitleProps) {
  return (
    <div className="mb-4">
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
      {/* Breadcrumb already names the page; the h1 stays for SEO / screen readers only. */}
      <h1 className="sr-only">{title}</h1>
    </div>
  );
}

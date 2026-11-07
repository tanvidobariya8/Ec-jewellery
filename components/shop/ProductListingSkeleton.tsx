/** Loading state for <ProductListing> (shown while filters re-render on the server). */
export function ProductListingSkeleton({ withTitle = false }: { withTitle?: boolean }) {
  return (
    <div aria-hidden="true">
      {withTitle && (
        <div className="mb-8">
          <div className="h-3 w-40 bg-surface" />
          <div className="mt-3 h-9 w-56 bg-surface" />
        </div>
      )}
      <div className="lg:grid lg:grid-cols-[15rem_1fr] lg:gap-10">
        <div className="hidden space-y-6 lg:block">
          <div className="h-5 w-24 bg-surface" />
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="space-y-3 border-t border-border pt-5">
              <div className="h-3 w-20 bg-surface" />
              {Array.from({ length: 4 }, (_, j) => (
                <div key={j} className="h-4 w-36 bg-surface" />
              ))}
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center gap-3 border-b border-border pb-5">
            <div className="h-10 w-28 bg-surface lg:hidden" />
            <div className="h-4 w-24 bg-surface" />
            <div className="ml-auto h-10 w-44 bg-surface" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i}>
                <div className="aspect-square animate-pulse bg-surface" />
                <div className="mt-4 h-3 w-1/3 bg-surface" />
                <div className="mt-2 h-4 w-2/3 bg-surface" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductEditor } from "@/components/admin/ProductEditor";

export const metadata: Metadata = { title: "Edit product" };

async function Editor({ params }: Pick<PageProps<"/admin/products/[id]">, "params">) {
  const { id } = await params;
  return <ProductEditor productId={id} />;
}

export default function AdminEditProductPage({ params }: PageProps<"/admin/products/[id]">) {
  return (
    <Suspense>
      <Editor params={params} />
    </Suspense>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { METALS_KEY, MetalRatesForm } from "@/components/admin/MetalRatesForm";
import { PricingSettingsForm, SETTINGS_KEY } from "@/components/admin/PricingSettingsForm";
import { QueryState } from "@/components/admin/QueryState";
import { getMetals, getPricingSettings } from "@/lib/api/admin";

export function PricingManager() {
  const metals = useQuery({ queryKey: METALS_KEY, queryFn: getMetals });
  const settings = useQuery({ queryKey: SETTINGS_KEY, queryFn: getPricingSettings });

  return (
    <>
      <AdminPageHeader
        title="Metal rates & margin"
        description="Product prices are calculated from these values — change a rate here and every product using that metal updates. Every change is recorded in the audit log."
      />
      <section aria-labelledby="rates-heading" className="mb-14">
        <h2 id="rates-heading" className="mb-4 text-2xl">
          Metal rates
        </h2>
        <QueryState isPending={metals.isPending} error={metals.error} onRetry={metals.refetch} />
        {metals.data && <MetalRatesForm key={metals.dataUpdatedAt} metals={metals.data} />}
      </section>
      <section aria-labelledby="settings-heading">
        <h2 id="settings-heading" className="mb-4 text-2xl">
          Margin, tax & rounding
        </h2>
        <QueryState
          isPending={settings.isPending}
          error={settings.error}
          onRetry={settings.refetch}
        />
        {settings.data && (
          <PricingSettingsForm key={settings.dataUpdatedAt} settings={settings.data} />
        )}
      </section>
    </>
  );
}

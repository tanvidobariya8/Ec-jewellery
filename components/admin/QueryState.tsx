import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { adminMessage } from "@/lib/api/admin";

type QueryStateProps = {
  isPending: boolean;
  error: unknown;
  onRetry?: () => void;
};

/** Loading spinner or error box for an admin query; renders nothing once data is ready. */
export function QueryState({ isPending, error, onRetry }: QueryStateProps) {
  if (error) {
    return (
      <div role="alert" className="border border-danger/30 bg-danger/5 p-6 text-sm">
        <p className="text-danger">{adminMessage(error, "Something went wrong loading this.")}</p>
        {onRetry && (
          <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
            Try again
          </Button>
        )}
      </div>
    );
  }
  if (isPending) {
    return (
      <div className="flex items-center gap-3 py-12 text-sm text-muted" role="status">
        <Loader2 aria-hidden="true" className="size-5 animate-spin" />
        Loading…
      </div>
    );
  }
  return null;
}

import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/70">
      <Loader2 className="h-12 w-12 animate-spin text-white" />
    </div>
  );
}

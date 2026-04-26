import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn("card-glass overflow-hidden flex flex-col", className)}>
      <Skeleton className="aspect-square w-full rounded-none bg-muted/60" />
      <div className="p-3 space-y-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-2/3 bg-muted/60" />
          <Skeleton className="h-5 w-14 rounded-md bg-muted/60" />
        </div>
        <Skeleton className="h-3 w-1/2 bg-muted/60" />
        <Skeleton className="h-4 w-1/3 bg-muted/60" />
      </div>
    </div>
  );
}

interface SkeletonGridProps {
  count?: number;
  className?: string;
}

export function SkeletonGrid({ count = 8, className }: SkeletonGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

import Skeleton from "./Skeleton";

export default function MovieCardSkeleton() {
  return (
    <div className="relative aspect-[2/3] rounded overflow-hidden">
      <Skeleton />
    </div>
  );
}

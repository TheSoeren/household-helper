import { Skeleton } from "@mui/material";

export default function ChoresPageSkeleton() {
  return (
    <>
      <div className="w-52 ml-6 pt-6 h-14">
        <Skeleton className="h-full" variant="text" />
      </div>
      <div className="flex flex-wrap mt-6 mb-9">
        <div className="w-full xl:w-3/12 mb-2 px-3 h-28">
          <Skeleton className="w-full h-full rounded" variant="rectangular" />
        </div>
        <div className="w-full xl:w-3/12 mb-2 px-3 h-28">
          <Skeleton className="w-full h-full rounded" variant="rectangular" />
        </div>
      </div>
      <div className="flex flex-wrap mt-14">
        <div className="w-full xl:w-3/12 mb-2 px-3 h-28">
          <Skeleton className="w-full h-full rounded" variant="rectangular" />
        </div>
      </div>
    </>
  );
}

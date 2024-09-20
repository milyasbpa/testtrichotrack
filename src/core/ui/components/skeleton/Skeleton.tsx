import ReactLoadingSkeleton, {
  SkeletonProps,
  SkeletonTheme,
} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Skeleton = (props: SkeletonProps) => {
  return (
    <SkeletonTheme baseColor="#3c3c3c" highlightColor="#444">
      <ReactLoadingSkeleton {...props} />
    </SkeletonTheme>
  );
};

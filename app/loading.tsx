import { PageSkeleton } from "@/components/shared/PageSkeleton";

// Shown while the landing page waits for its projects and experience.
export default function Loading() {
  return <PageSkeleton cards={3} />;
}

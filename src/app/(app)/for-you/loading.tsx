import { BookRowSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="page-stack">
      <section className="app-section">
        <div className="section-heading">
          <div>
            <h1>Selected just for you</h1>
          </div>
        </div>
        <BookRowSkeleton />
      </section>
      <section className="app-section">
        <div className="section-heading">
          <div>
            <h2>Recommended For You</h2>
            <p>We think you&apos;ll like these</p>
          </div>
        </div>
        <BookRowSkeleton />
      </section>
    </div>
  );
}

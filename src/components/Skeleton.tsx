export function BookRowSkeleton() {
  return (
    <div className="skeleton-row" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-card__image" />
          <div className="skeleton-card__line skeleton-card__line--title" />
          <div className="skeleton-card__line" />
        </div>
      ))}
    </div>
  );
}

/**
 * Wraps children with a reveal-on-scroll container.
 * Animation is driven by `data-visible` — a global IntersectionObserver
 * (inline script in the layout) flips the attribute to `"true"` when
 * the element scrolls into view.
 */
export function SectionReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className} data-visible="false">
      {children}
    </div>
  );
}

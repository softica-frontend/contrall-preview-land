"use client";

export function ScrollToTopButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <button
      type="button"
      aria-label="Go to homepage"
      onClick={(e) => {
        (e.currentTarget as HTMLElement).blur();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={className}
    >
      {children}
    </button>
  );
}

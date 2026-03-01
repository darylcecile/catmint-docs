import { useState, useEffect, useCallback, type ReactNode } from "react";

export function MobileNav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  // Close on route change (detect clicks on <a> tags inside the nav)
  const handleNavClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a")) {
      setOpen(false);
    }
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      {/* Mobile topbar — only visible below md breakpoint */}
      <header className="mobile-topbar">
        <a href="/" className="mobile-topbar-logo">
          <span className="size-[1em] object-contain relative inline-block">
            <img
              src="/catmint.png"
              alt=""
              className="absolute inset-0 w-full h-full"
            />
          </span>
          Catmint
        </a>
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <title>Close menu</title>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <title>Open menu</title>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </header>

      {/* Backdrop overlay — dismiss via button */}
      {open && (
        <button
          type="button"
          className="mobile-nav-backdrop"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
          tabIndex={-1}
        />
      )}

      {/* Sidebar wrapper — CSS controls visibility based on data attribute + breakpoint */}
      <nav
        className="mobile-nav-sidebar-wrapper"
        data-mobile-open={open ? "true" : "false"}
        onClick={handleNavClick}
        onKeyDown={() => {}}
      >
        {children}
      </nav>
    </>
  );
}

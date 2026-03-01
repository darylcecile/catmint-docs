import { useState, useEffect, useCallback } from "react";
import { Command } from "cmdk";
import { useNavigation } from "catmint/hooks";
import type { NavPackage } from "./nav-data";

interface CommandMenuProps {
  packages: NavPackage[];
}

export function CommandMenu({ packages }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const { navigate } = useNavigation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      navigate(href);
    },
    [navigate],
  );

  return (
    <>
      <button
        type="button"
        className="search-trigger"
        onClick={() => setOpen(true)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span>Search docs...</span>
        <kbd>
          <span className="kbd-meta">⌘</span>K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Search documentation"
        loop
        filter={(value, search, keywords) => {
          const searchLower = search.toLowerCase();
          const valueLower = value.toLowerCase();
          const extendedValue = keywords
            ? `${valueLower} ${keywords.join(" ").toLowerCase()}`
            : valueLower;

          // Exact match
          if (extendedValue === searchLower) return 1.0;

          // Starts with
          if (extendedValue.startsWith(searchLower)) return 0.9;

          // Word boundary match
          const words = extendedValue.split(/\s+/);
          for (const word of words) {
            if (word.startsWith(searchLower)) return 0.8;
          }

          // Contains anywhere
          if (extendedValue.includes(searchLower)) return 0.5;

          // No match
          return 0;
        }}
      >
        <Command.Input placeholder="Search docs..." autoFocus />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          {packages.map((pkg) =>
            pkg.sections.map((section) => {
              const groupKey = `${pkg.id}:${section.title}`;
              const groupHeading = `${pkg.label} — ${section.title}`;

              return (
                <Command.Group key={groupKey} heading={groupHeading}>
                  {section.links.map((link) => (
                    <Command.Item
                      key={link.href}
                      value={`${pkg.label} ${section.title} ${link.label}`}
                      onSelect={() => handleSelect(link.href)}
                      keywords={[
                        pkg.label.toLowerCase(),
                        section.title.toLowerCase(),
                        link.href.replace(/\//g, " ").trim(),
                      ]}
                    >
                      <span className="cmdk-item-icon">
                        {getPackageIcon(pkg.id)}
                      </span>
                      <span className="cmdk-item-content">
                        <span className="cmdk-item-label">{link.label}</span>
                        <span className="cmdk-item-section">
                          {pkg.label} — {section.title}
                        </span>
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              );
            }),
          )}
        </Command.List>
      </Command.Dialog>
    </>
  );
}

function getPackageIcon(packageId: string): string {
  switch (packageId) {
    case "framework":
      return "F";
    case "fs-core":
      return "C";
    case "fs-git":
      return "G";
    case "fs-sqlite":
      return "S";
    case "fs-git-auth":
      return "A";
    default:
      return "●";
  }
}

import { useState, useEffect, useCallback } from "react";
import { Command } from "cmdk";
import { useNavigation } from "catmint/hooks";
import type { NavSection } from "./nav-data";

interface CommandMenuProps {
  sections: NavSection[];
}

export function CommandMenu({ sections }: CommandMenuProps) {
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
      >
        <Command.Input placeholder="Search docs..." autoFocus />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          {sections.map((section) => (
            <Command.Group key={section.title} heading={section.title}>
              {section.links.map((link) => (
                <Command.Item
                  key={link.href}
                  value={`${section.title} ${link.label}`}
                  onSelect={() => handleSelect(link.href)}
                  keywords={[
                    section.title.toLowerCase(),
                    link.href.replace(/\//g, " ").trim(),
                  ]}
                >
                  <span className="cmdk-item-icon">
                    {getSectionIcon(section.title)}
                  </span>
                  <span className="cmdk-item-content">
                    <span className="cmdk-item-label">{link.label}</span>
                    <span className="cmdk-item-section">{section.title}</span>
                  </span>
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command.Dialog>
    </>
  );
}

function getSectionIcon(section: string): string {
  switch (section) {
    case "Getting Started":
      return "🏠";
    case "Guides":
      return "🙌🏽";
    case "API Reference":
      return "⬡";
    case "Examples":
      return "📙";
    case "Architecture Decisions":
      return "△";
    default:
      return "●";
  }
}

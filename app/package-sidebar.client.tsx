import { useState, useEffect } from "react";
import type { NavPackage } from "./nav-data";
import styles from "./sidebar.module.css";

interface PackageSidebarProps {
  packages: NavPackage[];
}

export function PackageSidebar({ packages }: PackageSidebarProps) {
  const [activePackageId, setActivePackageId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return detectPackageFromPath(window.location.pathname, packages);
    }
    return packages[0]?.id ?? "";
  });

  useEffect(() => {
    const detected = detectPackageFromPath(
      window.location.pathname,
      packages,
    );
    setActivePackageId(detected);
  }, [packages]);

  const activePackage = packages.find((p) => p.id === activePackageId);

  return (
    <>
      <div className={styles.packageSwitcher}>
        <select
          value={activePackageId}
          onChange={(e) => setActivePackageId(e.target.value)}
          className={styles.packageSelect}
        >
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.label}
            </option>
          ))}
        </select>
      </div>

      {activePackage?.sections.map((section) => (
        <div key={section.title} className={styles.section}>
          <div className={styles.sectionTitle}>{section.title}</div>
          {section.links.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </div>
      ))}
    </>
  );
}

function detectPackageFromPath(
  pathname: string,
  packages: NavPackage[],
): string {
  // Sort by basePath length descending so more specific paths match first
  const sorted = [...packages].sort(
    (a, b) => b.basePath.length - a.basePath.length,
  );
  for (const pkg of sorted) {
    if (pathname.startsWith(pkg.basePath)) {
      return pkg.id;
    }
  }
  return packages[0]?.id ?? "";
}

import { useState, useEffect, useCallback } from "react";
import { useNavigation } from "catmint/hooks";
import type { NavPackage } from "./nav-data";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select.client";
import styles from "./sidebar.module.css";

interface PackageSidebarProps {
  packages: NavPackage[];
}

export function PackageSidebar({ packages }: PackageSidebarProps) {
  const { navigate } = useNavigation();

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

  const handlePackageChange = useCallback(
    (packageId: string) => {
      setActivePackageId(packageId);
      const pkg = packages.find((p) => p.id === packageId);
      if (pkg) {
        // Navigate to the first link in the package's nav
        const firstLink = pkg.sections[0]?.links[0]?.href;
        navigate(firstLink ?? pkg.basePath);
      }
    },
    [packages, navigate],
  );

  const activePackage = packages.find((p) => p.id === activePackageId);

  return (
    <>
      <div className={styles.packageSwitcher}>
        <Select value={activePackageId} onValueChange={handlePackageChange}>
          <SelectTrigger aria-label="Select package">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {packages.map((pkg) => (
              <SelectItem key={pkg.id} value={pkg.id}>
                {pkg.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

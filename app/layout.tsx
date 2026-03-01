import React from "react";
import styles from "./sidebar.module.css";
import "./globals.css";
import { NAV_PACKAGES } from "./nav-data";
import { CommandMenu } from "./command-menu.client";
import { PackageSidebar } from "./package-sidebar.client";
import { MobileNav } from "./mobile-nav.client";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Catmint Documentation</title>
      </head>
      <body>
        <div className="flex min-h-screen">
          <MobileNav>
            <div className={styles.sidebar}>
              <a href="/" className={styles.logo}>
                <span className="size-[1em] object-contain relative inline-block">
                  <img
                    src="/catmint.png"
                    alt=""
                    className="absolute inset-0 w-full h-full"
                  />
                </span>
                Catmint
              </a>
              <div className="loc">
                <CommandMenu packages={NAV_PACKAGES} />
                <PackageSidebar packages={NAV_PACKAGES} />
              </div>
            </div>
          </MobileNav>
          <main className="docs-main">
            <article className="prose prose-gray lg:prose-lg">
              {children}
            </article>
          </main>
        </div>
      </body>
    </html>
  );
}

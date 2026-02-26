import React from "react";
import styles from "./sidebar.module.css";
import "./globals.css";
import { NAV_SECTIONS } from "./nav-data";
import { CommandMenu } from "./command-menu.client";

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
          <nav className={styles.sidebar}>
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
            <CommandMenu sections={NAV_SECTIONS} />
            {NAV_SECTIONS.map((section) => (
              <div key={section.title} className={styles.section}>
                <div className={styles.sectionTitle}>{section.title}</div>
                {section.links.map((link) => (
                  <a key={link.href} href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
          <main className="ml-[280px] flex-1 px-16 py-12 max-w-[900px]">
            <article className="prose prose-gray lg:prose-lg">
              {children}
            </article>
          </main>
        </div>
      </body>
    </html>
  );
}

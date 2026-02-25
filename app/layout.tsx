import React from "react";
import styles from "./sidebar.module.css";
import "./globals.css";

const NAV_SECTIONS = [
  {
    title: "Getting Started",
    links: [
      { href: "/getting-started/installation", label: "Installation" },
      { href: "/getting-started/quick-start", label: "Quick Start" },
      {
        href: "/getting-started/project-structure",
        label: "Project Structure",
      },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/guides/routing", label: "Routing" },
      { href: "/guides/layouts", label: "Layouts" },
      { href: "/guides/middleware", label: "Middleware" },
      { href: "/guides/server-functions", label: "Server Functions" },
      { href: "/guides/rsc", label: "React Server Components" },
      { href: "/guides/caching", label: "Caching" },
      { href: "/guides/api-endpoints", label: "API Endpoints" },
      { href: "/guides/static-assets", label: "Static Assets" },
      { href: "/guides/env-variables", label: "Environment Variables" },
      { href: "/guides/status-pages", label: "Status Pages" },
      { href: "/guides/cookies", label: "Cookies" },
      { href: "/guides/hooks", label: "Hooks" },
      { href: "/guides/headers", label: "Headers" },
      { href: "/guides/head-metadata", label: "Head & Metadata" },
      { href: "/guides/error-handling", label: "Error Handling" },
      { href: "/guides/form-actions", label: "Form Actions" },
      { href: "/guides/testing", label: "Testing" },
      { href: "/guides/i18n", label: "Internationalization" },
      { href: "/guides/security", label: "Security" },
      { href: "/guides/telemetry", label: "Telemetry" },
      { href: "/guides/authentication", label: "Authentication" },
      { href: "/guides/database", label: "Database" },
      { href: "/guides/styling", label: "Styling" },
      { href: "/guides/deployment", label: "Deployment" },
    ],
  },
  {
    title: "API Reference",
    links: [
      { href: "/api/config", label: "defineConfig" },
      { href: "/api/defineRoutes", label: "defineRoutes" },
      { href: "/api/redirect", label: "redirect" },
      { href: "/api/endpoints", label: "Endpoints" },
      { href: "/api/createServerFn", label: "createServerFn" },
      { href: "/api/createIsomorphicFn", label: "createIsomorphicFn" },
      { href: "/api/cachedRoute", label: "cachedRoute" },
      { href: "/api/layout", label: "layout" },
      { href: "/api/middleware", label: "middleware" },
      { href: "/api/statusResponse", label: "statusResponse" },
      { href: "/api/cookies", label: "cookies" },
      { href: "/api/headers", label: "headers" },
      { href: "/api/Head", label: "Head" },
      { href: "/api/useHead", label: "useHead" },
      { href: "/api/generateMetadata", label: "generateMetadata" },
      { href: "/api/ErrorBoundary", label: "ErrorBoundary" },
      { href: "/api/Form", label: "Form" },
      { href: "/api/provideRouteData", label: "provideRouteData" },
      { href: "/api/useParams", label: "useParams" },
      { href: "/api/useSearch", label: "useSearch" },
      { href: "/api/useNavigation", label: "useNavigation" },
      { href: "/api/useServerFn", label: "useServerFn" },
      { href: "/api/useServerQuery", label: "useServerQuery" },
      { href: "/api/useRouteData", label: "useRouteData" },
      { href: "/api/useFormAction", label: "useFormAction" },
      { href: "/api/useLocale", label: "useLocale" },
      { href: "/api/getLocale", label: "getLocale" },
      { href: "/api/renderPage", label: "renderPage" },
      { href: "/api/mockServerFn", label: "mockServerFn" },
      { href: "/api/createTestRequest", label: "createTestRequest" },
      { href: "/api/createTestContext", label: "createTestContext" },
      { href: "/api/csp", label: "csp" },
      { href: "/api/trace", label: "trace" },
      { href: "/api/logger", label: "logger" },
      { href: "/api/env", label: "env" },
      { href: "/api/CatmintAdapter", label: "CatmintAdapter" },
      { href: "/api/adapter-node", label: "adapter-node" },
      { href: "/api/adapter-vercel", label: "adapter-vercel" },
      { href: "/api/adapter-cloudflare", label: "adapter-cloudflare" },
    ],
  },
  {
    title: "Examples",
    links: [
      { href: "/examples/counter", label: "Counter (useState)" },
      { href: "/examples/todo", label: "Todo List" },
      { href: "/examples/server-data", label: "Server Data" },
      { href: "/examples/form", label: "Form Validation" },
      { href: "/examples/fetch-api", label: "API Fetching" },
      { href: "/examples/boundaries", label: "Server/Client Boundaries" },
      { href: "/examples/server-fn", label: "Server Functions" },
      { href: "/examples/static-route", label: "Static Route" },
      { href: "/examples/cached-route", label: "Cached Route" },
      { href: "/examples/loading-error", label: "Loading & Error" },
      { href: "/examples/async-component", label: "Async Components" },
      { href: "/examples/generate-metadata", label: "generateMetadata" },
    ],
  },
  {
    title: "Architecture Decisions",
    links: [
      {
        href: "/adr/001-vite-as-build-tool",
        label: "ADR-001: Vite as Build Tool",
      },
      {
        href: "/adr/002-file-naming-conventions",
        label: "ADR-002: File Naming",
      },
      { href: "/adr/003-explicit-caching", label: "ADR-003: Explicit Caching" },
    ],
  },
];

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
              Catmint
            </a>
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

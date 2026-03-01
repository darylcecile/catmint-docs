export interface NavLink {
  href: string;
  label: string;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

export interface NavPackage {
  id: string;
  label: string;
  basePath: string;
  sections: NavSection[];
}

export const NAV_PACKAGES: NavPackage[] = [
  {
    id: "framework",
    label: "Catmint Framework",
    basePath: "/framework",
    sections: [
      {
        title: "Getting Started",
        links: [
          {
            href: "/framework/getting-started/installation",
            label: "Installation",
          },
          {
            href: "/framework/getting-started/quick-start",
            label: "Quick Start",
          },
          {
            href: "/framework/getting-started/project-structure",
            label: "Project Structure",
          },
        ],
      },
      {
        title: "Guides",
        links: [
          { href: "/framework/guides/routing", label: "Routing" },
          { href: "/framework/guides/layouts", label: "Layouts" },
          { href: "/framework/guides/middleware", label: "Middleware" },
          {
            href: "/framework/guides/server-functions",
            label: "Server Functions",
          },
          {
            href: "/framework/guides/rsc",
            label: "React Server Components",
          },
          { href: "/framework/guides/caching", label: "Caching" },
          { href: "/framework/guides/api-endpoints", label: "API Endpoints" },
          { href: "/framework/guides/static-assets", label: "Static Assets" },
          {
            href: "/framework/guides/env-variables",
            label: "Environment Variables",
          },
          { href: "/framework/guides/status-pages", label: "Status Pages" },
          { href: "/framework/guides/cookies", label: "Cookies" },
          { href: "/framework/guides/hooks", label: "Hooks" },
          { href: "/framework/guides/headers", label: "Headers" },
          {
            href: "/framework/guides/head-metadata",
            label: "Head & Metadata",
          },
          {
            href: "/framework/guides/error-handling",
            label: "Error Handling",
          },
          { href: "/framework/guides/form-actions", label: "Form Actions" },
          { href: "/framework/guides/testing", label: "Testing" },
          { href: "/framework/guides/i18n", label: "Internationalization" },
          { href: "/framework/guides/security", label: "Security" },
          { href: "/framework/guides/telemetry", label: "Telemetry" },
          {
            href: "/framework/guides/authentication",
            label: "Authentication",
          },
          { href: "/framework/guides/database", label: "Database" },
          { href: "/framework/guides/styling", label: "Styling" },
          { href: "/framework/guides/deployment", label: "Deployment" },
        ],
      },
      {
        title: "API Reference",
        links: [
          { href: "/framework/api/config", label: "defineConfig" },
          { href: "/framework/api/defineRoutes", label: "defineRoutes" },
          { href: "/framework/api/redirect", label: "redirect" },
          { href: "/framework/api/endpoints", label: "Endpoints" },
          { href: "/framework/api/createServerFn", label: "createServerFn" },
          {
            href: "/framework/api/createIsomorphicFn",
            label: "createIsomorphicFn",
          },
          { href: "/framework/api/cachedRoute", label: "cachedRoute" },
          { href: "/framework/api/layout", label: "layout" },
          { href: "/framework/api/middleware", label: "middleware" },
          { href: "/framework/api/statusResponse", label: "statusResponse" },
          { href: "/framework/api/cookies", label: "cookies" },
          { href: "/framework/api/headers", label: "headers" },
          { href: "/framework/api/Head", label: "Head" },
          { href: "/framework/api/useHead", label: "useHead" },
          {
            href: "/framework/api/generateMetadata",
            label: "generateMetadata",
          },
          { href: "/framework/api/ErrorBoundary", label: "ErrorBoundary" },
          { href: "/framework/api/Form", label: "Form" },
          {
            href: "/framework/api/provideRouteData",
            label: "provideRouteData",
          },
          { href: "/framework/api/useParams", label: "useParams" },
          { href: "/framework/api/useSearch", label: "useSearch" },
          { href: "/framework/api/useNavigation", label: "useNavigation" },
          { href: "/framework/api/useServerFn", label: "useServerFn" },
          { href: "/framework/api/useServerQuery", label: "useServerQuery" },
          { href: "/framework/api/useRouteData", label: "useRouteData" },
          { href: "/framework/api/useFormAction", label: "useFormAction" },
          { href: "/framework/api/useLocale", label: "useLocale" },
          { href: "/framework/api/getLocale", label: "getLocale" },
          { href: "/framework/api/renderPage", label: "renderPage" },
          { href: "/framework/api/mockServerFn", label: "mockServerFn" },
          {
            href: "/framework/api/createTestRequest",
            label: "createTestRequest",
          },
          {
            href: "/framework/api/createTestContext",
            label: "createTestContext",
          },
          { href: "/framework/api/csp", label: "csp" },
          { href: "/framework/api/trace", label: "trace" },
          { href: "/framework/api/logger", label: "logger" },
          { href: "/framework/api/env", label: "env" },
          { href: "/framework/api/CatmintAdapter", label: "CatmintAdapter" },
          { href: "/framework/api/adapter-node", label: "adapter-node" },
          { href: "/framework/api/adapter-vercel", label: "adapter-vercel" },
          {
            href: "/framework/api/adapter-cloudflare",
            label: "adapter-cloudflare",
          },
        ],
      },
      {
        title: "Examples",
        links: [
          {
            href: "/framework/examples/counter",
            label: "Counter (useState)",
          },
          { href: "/framework/examples/todo", label: "Todo List" },
          { href: "/framework/examples/server-data", label: "Server Data" },
          { href: "/framework/examples/form", label: "Form Validation" },
          { href: "/framework/examples/fetch-api", label: "API Fetching" },
          {
            href: "/framework/examples/boundaries",
            label: "Server/Client Boundaries",
          },
          {
            href: "/framework/examples/server-fn",
            label: "Server Functions",
          },
          { href: "/framework/examples/static-route", label: "Static Route" },
          { href: "/framework/examples/cached-route", label: "Cached Route" },
          {
            href: "/framework/examples/loading-error",
            label: "Loading & Error",
          },
          {
            href: "/framework/examples/async-component",
            label: "Async Components",
          },
          {
            href: "/framework/examples/generate-metadata",
            label: "generateMetadata",
          },
        ],
      },
      {
        title: "Architecture Decisions",
        links: [
          {
            href: "/framework/adr/001-vite-as-build-tool",
            label: "ADR-001: Vite as Build Tool",
          },
          {
            href: "/framework/adr/002-file-naming-conventions",
            label: "ADR-002: File Naming",
          },
          {
            href: "/framework/adr/003-explicit-caching",
            label: "ADR-003: Explicit Caching",
          },
        ],
      },
    ],
  },
  {
    id: "fs-core",
    label: "@catmint-fs/core",
    basePath: "/fs/core",
    sections: [
      {
        title: "Getting Started",
        links: [
          { href: "/fs/core/overview", label: "Overview" },
          { href: "/fs/core/installation", label: "Installation" },
          { href: "/fs/core/quick-start", label: "Quick Start" },
        ],
      },
      {
        title: "Guides",
        links: [
          { href: "/fs/core/guides/layers", label: "Layers" },
          { href: "/fs/core/guides/adapters", label: "Adapters" },
          { href: "/fs/core/guides/change-tracking", label: "Change Tracking" },
          { href: "/fs/core/guides/applying-changes", label: "Applying Changes" },
          { href: "/fs/core/guides/permissions", label: "Permissions" },
          { href: "/fs/core/guides/symlinks", label: "Symlinks" },
          { href: "/fs/core/guides/custom-adapters", label: "Custom Adapters" },
        ],
      },
      {
        title: "API Reference",
        links: [
          { href: "/fs/core/api/createLayer", label: "createLayer" },
          { href: "/fs/core/api/layer", label: "Layer" },
          { href: "/fs/core/api/fs-adapter", label: "FsAdapter" },
          { href: "/fs/core/api/local-adapter", label: "LocalAdapter" },
          { href: "/fs/core/api/types", label: "Types" },
        ],
      },
    ],
  },
  {
    id: "fs-git",
    label: "@catmint-fs/git",
    basePath: "/fs/git",
    sections: [
      {
        title: "Getting Started",
        links: [
          { href: "/fs/git/overview", label: "Overview" },
          { href: "/fs/git/installation", label: "Installation" },
          { href: "/fs/git/quick-start", label: "Quick Start" },
        ],
      },
      {
        title: "Guides",
        links: [
          { href: "/fs/git/guides/repositories", label: "Repositories" },
          { href: "/fs/git/guides/branches", label: "Branches" },
          { href: "/fs/git/guides/staging-commits", label: "Staging & Commits" },
          { href: "/fs/git/guides/merging", label: "Merging" },
          { href: "/fs/git/guides/diffing", label: "Diffing" },
          { href: "/fs/git/guides/tags", label: "Tags" },
          { href: "/fs/git/guides/stashing", label: "Stashing" },
          { href: "/fs/git/guides/remotes", label: "Remotes & Transport" },
          { href: "/fs/git/guides/internals", label: "Internals" },
        ],
      },
      {
        title: "API Reference",
        links: [
          { href: "/fs/git/api/initRepository", label: "initRepository" },
          { href: "/fs/git/api/openRepository", label: "openRepository" },
          { href: "/fs/git/api/cloneRepository", label: "cloneRepository" },
          { href: "/fs/git/api/repository", label: "Repository" },
          { href: "/fs/git/api/httpTransport", label: "httpTransport" },
          { href: "/fs/git/api/types", label: "Types" },
        ],
      },
    ],
  },
  {
    id: "fs-sqlite",
    label: "@catmint-fs/sqlite-adapter",
    basePath: "/fs/sqlite-adapter",
    sections: [
      {
        title: "Getting Started",
        links: [
          { href: "/fs/sqlite-adapter/overview", label: "Overview" },
          { href: "/fs/sqlite-adapter/installation", label: "Installation" },
          { href: "/fs/sqlite-adapter/quick-start", label: "Quick Start" },
        ],
      },
      {
        title: "Guides",
        links: [
          { href: "/fs/sqlite-adapter/guides/schema", label: "Schema" },
          {
            href: "/fs/sqlite-adapter/guides/import-export",
            label: "Import & Export",
          },
          {
            href: "/fs/sqlite-adapter/guides/transactions",
            label: "Transactions",
          },
        ],
      },
      {
        title: "API Reference",
        links: [
          {
            href: "/fs/sqlite-adapter/api/sqlite-adapter",
            label: "SqliteAdapter",
          },
          { href: "/fs/sqlite-adapter/api/types", label: "Types" },
        ],
      },
    ],
  },
  {
    id: "fs-git-auth",
    label: "@catmint-fs/git-auth-node",
    basePath: "/fs/git-auth-node",
    sections: [
      {
        title: "Getting Started",
        links: [
          { href: "/fs/git-auth-node/overview", label: "Overview" },
          { href: "/fs/git-auth-node/installation", label: "Installation" },
        ],
      },
      {
        title: "API Reference",
        links: [
          {
            href: "/fs/git-auth-node/api/createNodeAuthCallbacks",
            label: "createNodeAuthCallbacks",
          },
          {
            href: "/fs/git-auth-node/api/createAuthenticatedTransport",
            label: "createAuthenticatedTransport",
          },
          {
            href: "/fs/git-auth-node/api/credentials",
            label: "Credential Helpers",
          },
        ],
      },
    ],
  },
];


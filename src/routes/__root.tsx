import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#05070d] px-4 text-white">
      <div className="glass max-w-md rounded-2xl p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#28e7ff]">Signal Lost</p>
        <h1 className="mt-3 text-7xl font-black">404</h1>
        <h2 className="mt-4 text-xl font-black">Page not found</h2>
        <p className="mt-2 text-sm text-slate-400">
          This route is not connected to the FighterPlayz network.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-[#28e7ff] px-4 py-2 text-sm font-bold text-[#05070d] transition-colors hover:bg-white"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#05070d] px-4 text-white">
      <div className="glass max-w-md rounded-2xl p-8 text-center">
        <h1 className="text-xl font-black tracking-tight">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-[#28e7ff] px-4 py-2 text-sm font-bold text-[#05070d] transition-colors hover:bg-white"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 transition-colors hover:border-[#28e7ff]/40 hover:text-[#28e7ff]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FighterPlayz Ecosystem" },
      { name: "description", content: "FighterPlayz Minecraft infrastructure, plugin development, server optimization, and web systems ecosystem." },
      { name: "author", content: "FighterPlayz" },
      { property: "og:title", content: "FighterPlayz Ecosystem" },
      { property: "og:description", content: "Premium Minecraft infrastructure, plugin development, and web systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@fightergamerofficial1" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

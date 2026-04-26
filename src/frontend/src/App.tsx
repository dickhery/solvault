import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./components/layout/Layout";

// Lazy page imports
import { Suspense, lazy, useEffect } from "react";
import { SkeletonGrid } from "./components/ui/SkeletonCard";
import { useAppConfig } from "./hooks/use-admin";
import { setActiveRpcUrl } from "./lib/solana";

const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const MarketplacePage = lazy(() => import("./pages/MarketplacePage"));
const MyCollectionsPage = lazy(() => import("./pages/MyCollectionsPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NftDetailPage = lazy(() => import("./pages/NftDetailPage"));
const ActivityPage = lazy(() => import("./pages/ActivityPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

function PageLoader() {
  return (
    <div className="mt-8">
      <SkeletonGrid count={8} />
    </div>
  );
}

// Syncs the admin-configured Solana RPC URL into the module-level active URL
// so every Solana call across the app uses the correct endpoint (mainnet vs devnet).
function RpcConfigSync() {
  const { data: config } = useAppConfig();
  useEffect(() => {
    if (config?.solanaRpcUrl) {
      setActiveRpcUrl(config.solanaRpcUrl);
    }
  }, [config?.solanaRpcUrl]);
  return null;
}

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <RpcConfigSync />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: PortfolioPage,
});

const marketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/marketplace",
  component: MarketplacePage,
});

const myCollectionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-collections",
  component: MyCollectionsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const nftDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nft/$mintAddress",
  component: NftDetailPage,
});

const activityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/activity",
  component: ActivityPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  marketplaceRoute,
  myCollectionsRoute,
  adminRoute,
  nftDetailRoute,
  activityRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

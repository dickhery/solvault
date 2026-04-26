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
import { Suspense, lazy } from "react";
import { SkeletonGrid } from "./components/ui/SkeletonCard";

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

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
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

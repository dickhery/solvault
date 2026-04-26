import { usePhantom } from "@/contexts/phantom-context";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Briefcase,
  Layers,
  LayoutGrid,
  Settings,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
  requiresAuth?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Portfolio", icon: Briefcase },
  { to: "/marketplace", label: "Marketplace", icon: LayoutGrid },
  {
    to: "/my-collections",
    label: "My Collections",
    icon: Layers,
    requiresAuth: true,
  },
  { to: "/activity", label: "Activity", icon: Activity, requiresAuth: true },
  {
    to: "/admin",
    label: "Admin",
    icon: ShieldCheck,
    adminOnly: true,
    requiresAuth: true,
  },
];

const BOTTOM_ITEMS: NavItem[] = [
  { to: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { role, isConnected } = usePhantom();

  const visibleItems = NAV_ITEMS.filter((item) => {
    if (item.adminOnly && role !== "admin") return false;
    if (item.requiresAuth && !isConnected) return false;
    return true;
  });

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-60 flex flex-col",
          "bg-sidebar border-r border-sidebar-border",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-sidebar-border shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.logo_link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SolVault
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-0.5">
            {visibleItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/10 transition-smooth group"
                activeProps={{
                  className:
                    "bg-primary/10 text-primary border border-primary/20",
                }}
                data-ocid={`nav.${item.label.toLowerCase().replace(/ /g, "_")}_link`}
                onClick={onClose}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom nav */}
        <div className="px-3 py-4 border-t border-sidebar-border space-y-0.5">
          {BOTTOM_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/10 transition-smooth"
              activeProps={{
                className:
                  "bg-primary/10 text-primary border border-primary/20",
              }}
              data-ocid={`nav.${item.label.toLowerCase()}_link`}
              onClick={onClose}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}

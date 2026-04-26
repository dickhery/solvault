import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePhantom } from "@/contexts/phantom-context";
import { truncateAddress } from "@/lib/solana";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Copy, Loader2, LogOut, Menu, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { address, role, isConnecting, isConnected, connect, disconnect } =
    usePhantom();
  const [menuOpen, setMenuOpen] = useState(false);

  const copyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="h-16 px-4 lg:px-6 flex items-center justify-between bg-card border-b border-border shrink-0 sticky top-0 z-20">
      {/* Left: mobile menu + network badge */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Open sidebar"
          data-ocid="header.menu_button"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Badge
          variant="outline"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 border-accent/30 bg-accent/5 text-accent text-xs font-mono"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Devnet
        </Badge>
      </div>

      {/* Right: admin link + connect button */}
      <div className="flex items-center gap-3">
        {role === "admin" && (
          <Link to="/admin" data-ocid="header.admin_link">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex gap-1.5 text-primary border border-primary/20 hover:bg-primary/10"
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </Button>
          </Link>
        )}

        {!isConnected ? (
          <Button
            onClick={connect}
            disabled={isConnecting}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20"
            data-ocid="header.connect_wallet_button"
          >
            {isConnecting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 128 128"
                fill="currentColor"
                aria-hidden="true"
                role="img"
              >
                <title>Phantom Wallet</title>
                <path d="M64 0C28.65 0 0 28.65 0 64s28.65 64 64 64 64-28.65 64-64S99.35 0 64 0zm32.4 86.07c-1.37 1.64-3.82 2.4-7.23 2.4H38.83c-3.41 0-5.86-.76-7.23-2.4-1.23-1.47-1.54-3.56-.93-6.4l7.37-34.5c.77-3.6 3.6-5.75 7.73-5.75h36.46c4.13 0 6.96 2.15 7.73 5.75l7.37 34.5c.6 2.84.3 4.93-.93 6.4z" />
              </svg>
            )}
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-smooth",
                "bg-card border-border hover:border-primary/40 text-sm font-mono",
              )}
              data-ocid="header.wallet_address_button"
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-foreground">
                {truncateAddress(address!)}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={closeMenu}
                  onKeyDown={(e) => e.key === "Escape" && closeMenu()}
                  role="button"
                  tabIndex={-1}
                  aria-label="Close wallet menu"
                />
                <div
                  className="absolute right-0 top-full mt-2 z-20 w-48 rounded-lg border border-border bg-popover shadow-xl"
                  data-ocid="header.wallet_dropdown_menu"
                >
                  <button
                    type="button"
                    onClick={copyAddress}
                    className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-popover-foreground hover:bg-muted/50 transition-colors rounded-t-lg"
                    data-ocid="header.copy_address_button"
                  >
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                    Copy Address
                  </button>
                  <div className="h-px bg-border" />
                  <button
                    type="button"
                    onClick={() => {
                      disconnect();
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors rounded-b-lg"
                    data-ocid="header.disconnect_button"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Disconnect
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

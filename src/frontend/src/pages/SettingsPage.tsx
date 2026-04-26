import { AddressChip } from "@/components/ui/AddressChip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { usePhantom } from "@/contexts/phantom-context";
import { Bell, Globe, Palette, Settings, Shield } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { address, role, isConnected, connect, disconnect } = usePhantom();
  const [notifications, setNotifications] = useState(true);
  const [devnetWarning, setDevnetWarning] = useState(true);

  return (
    <div className="max-w-2xl space-y-8" data-ocid="settings.page">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your account and preferences
        </p>
      </div>

      {/* Wallet section */}
      <div className="card-glass p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="font-display font-semibold text-foreground">Wallet</h2>
        </div>
        <Separator className="bg-border" />
        {isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Connected Address
              </span>
              <AddressChip
                address={address!}
                data-ocid="settings.wallet_address_chip"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Role</span>
              <Badge
                variant="outline"
                className="border-primary/20 text-primary bg-primary/5 text-xs capitalize"
              >
                {role}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Network</span>
              <Badge
                variant="outline"
                className="border-accent/20 text-accent bg-accent/5 text-xs"
              >
                Devnet
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-destructive/30 text-destructive hover:bg-destructive/10"
              onClick={disconnect}
              data-ocid="settings.disconnect_button"
            >
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              No wallet connected.
            </p>
            <Button
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={connect}
              data-ocid="settings.connect_wallet_button"
            >
              Connect Phantom
            </Button>
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="card-glass p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-display font-semibold text-foreground">
            Notifications
          </h2>
        </div>
        <Separator className="bg-border" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">
                Sale notifications
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Get notified when your NFTs sell
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              data-ocid="settings.notifications_switch"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">Devnet warning</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Show network badge reminder
              </p>
            </div>
            <Switch
              checked={devnetWarning}
              onCheckedChange={setDevnetWarning}
              data-ocid="settings.devnet_warning_switch"
            />
          </div>
        </div>
      </div>

      {/* Network */}
      <div className="card-glass p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="font-display font-semibold text-foreground">
            Network
          </h2>
        </div>
        <Separator className="bg-border" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">Solana Devnet</p>
            <p className="text-xs font-mono text-muted-foreground mt-0.5">
              https://api.devnet.solana.com
            </p>
          </div>
          <Badge
            variant="outline"
            className="border-accent/20 text-accent bg-accent/5"
          >
            Active
          </Badge>
        </div>
      </div>
    </div>
  );
}

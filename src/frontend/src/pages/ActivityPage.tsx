import { AddressChip } from "@/components/ui/AddressChip";
import { EmptyState } from "@/components/ui/EmptyState";
import { SolAmount } from "@/components/ui/SolAmount";
import { TransactionBadge } from "@/components/ui/TransactionBadge";
import { usePhantom } from "@/contexts/phantom-context";
import { Activity, ArrowDownLeft, ArrowUpRight, Zap } from "lucide-react";

type ActivityType = "buy" | "sell" | "mint" | "list";

interface ActivityItem {
  id: string;
  type: ActivityType;
  nftName: string;
  collection: string;
  price: number;
  from: string;
  to: string;
  txHash: string;
  timestamp: string;
  status: "pending" | "confirmed" | "failed";
}

const DEMO_ACTIVITY: ActivityItem[] = [
  {
    id: "a1",
    type: "buy",
    nftName: "Cosmic Ape #001",
    collection: "Cosmic Apes",
    price: 12.5,
    from: "7xKXtg2CW87d9",
    to: "3rGNJbKCc4hfB",
    txHash: "5Kn3q8z",
    timestamp: "2m ago",
    status: "confirmed",
  },
  {
    id: "a2",
    type: "list",
    nftName: "Void Entity #333",
    collection: "Void Entities",
    price: 8.75,
    from: "3rGNJbKCc4hfB",
    to: "marketplace",
    txHash: "7mPw4r2",
    timestamp: "1h ago",
    status: "confirmed",
  },
  {
    id: "a3",
    type: "mint",
    nftName: "Neon Skull #099",
    collection: "Neon Skulls",
    price: 0.1,
    from: "system",
    to: "3rGNJbKCc4hfB",
    txHash: "2xQv9m1",
    timestamp: "3h ago",
    status: "confirmed",
  },
  {
    id: "a4",
    type: "sell",
    nftName: "Solar Fox #044",
    collection: "Solar Foxes",
    price: 19.0,
    from: "3rGNJbKCc4hfB",
    to: "9kLmNp7aXYZ",
    txHash: "4rTs8n3",
    timestamp: "1d ago",
    status: "confirmed",
  },
  {
    id: "a5",
    type: "buy",
    nftName: "Pixel Punk #007",
    collection: "Pixel Punks",
    price: 30.0,
    from: "2cVwQr5",
    to: "3rGNJbKCc4hfB",
    txHash: "6yUv1s9",
    timestamp: "2d ago",
    status: "failed",
  },
];

const TYPE_CONFIG: Record<
  ActivityType,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }
> = {
  buy: { label: "Bought", icon: ArrowDownLeft, color: "text-accent" },
  sell: { label: "Sold", icon: ArrowUpRight, color: "text-primary" },
  mint: { label: "Minted", icon: Zap, color: "text-yellow-400" },
  list: { label: "Listed", icon: Activity, color: "text-muted-foreground" },
};

export default function ActivityPage() {
  const { isConnected, connect } = usePhantom();

  if (!isConnected) {
    return (
      <EmptyState
        icon={Activity}
        title="Connect your wallet"
        description="Connect to view your transaction history."
        ctaLabel="Connect Wallet"
        onCta={connect}
        data-ocid="activity.empty_state"
      />
    );
  }

  return (
    <div className="space-y-6" data-ocid="activity.page">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Activity
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Your recent transactions
        </p>
      </div>

      <div className="card-glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">
                  Event
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">
                  NFT
                </th>
                <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground">
                  Price
                </th>
                <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">
                  Time
                </th>
                <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {DEMO_ACTIVITY.map((item, i) => {
                const config = TYPE_CONFIG[item.type];
                const { icon: Icon } = config;
                return (
                  <tr
                    key={item.id}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    data-ocid={`activity.item.${i + 1}`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${config.color}`} />
                        <span className={`font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <p className="font-medium text-foreground">
                        {item.nftName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.collection}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <SolAmount sol={item.price} size="sm" />
                    </td>
                    <td className="px-5 py-3 text-right hidden md:table-cell">
                      <span className="text-xs text-muted-foreground">
                        {item.timestamp}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <TransactionBadge status={item.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

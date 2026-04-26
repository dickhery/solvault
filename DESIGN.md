# SolVault — Design System

## Visual Direction
Dark luxury Web3 marketplace. Neon Solana purple & teal accents on deep navy base. Premium OpenSea/Magic Eden feel with precise, minimalist edge.

## Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| **background** | `0.10 0 0` | Deep navy page base |
| **card** | `0.16 0.02 270` | Glass-effect card surfaces with purple tint |
| **foreground** | `0.92 0 0` | High-contrast text |
| **primary** | `0.65 0.20 286` | Solana purple; primary interactive elements |
| **accent** | `0.66 0.18 200` | Electric teal; CTAs, active states, highlights |
| **muted** | `0.20 0.01 0` | Subtle neutral for disabled/secondary states |
| **border** | `0.24 0.04 270` | Soft purple-tinted dividers & card edges |
| **destructive** | `0.60 0.22 30` | Warm red for deletions & warnings |

## Typography

| Layer | Font | Use |
|-------|------|-----|
| **Display** | Bricolage Grotesque | Navigation, page titles, badges (geometric, Web3-native) |
| **Body** | DM Sans | UI copy, descriptions (crisp, readable) |
| **Mono** | JetBrains Mono | Wallet addresses, token values, code (precise) |

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| **Header** | `bg-card` + `border-b border-border` | Phantom connect button, user address, admin link |
| **Sidebar** | `bg-sidebar` (`0.13 L`) with `border-r` | Portfolio, Marketplace, My Collections nav |
| **Content** | `bg-background` | NFT grids, auction carousels, empty states |
| **Card** | `.card-glass`: `bg-card/80` + backdrop blur | NFT previews, collection details, listings |
| **Footer** | `bg-muted/20` + `border-t` | Attribution, minimal styling |

## Patterns & Components

- **NFT Card** (`.nft-card`): Glass effect with subtle border, hover state lifts accent border to `0.5` opacity
- **Badge** (`.badge-primary`): Small token with purple background at `10%` opacity, mono font for precision
- **Button** (`.button-accent`): Teal accent background with hover opacity shift, smooth transition
- **Text Accent** (`.text-accent-glow`): Purple primary text, bold weight for emphasis
- **Shadow Hierarchy**: Card shadow adds slight depth, accent glow shadow for CTAs

## Motion

- **Transitions**: `transition-smooth` (0.3s cubic-bezier) on all interactive elements
- **Float**: Subtle 3s vertical float on featured items (auctions carousel)
- **Fade-in**: 0.4s entrance for modals and newly loaded content

## Anti-Patterns

- No rainbow gradients; color reserved for semantic purpose
- No default Tailwind blue or grey; all tokens OKLCH-defined
- No glow effects on card backgrounds; only accent highlights on actions
- Neon used sparingly: accent CTA only, not on every interactive element

## Notes

SolVault prioritizes dashboard clarity over decoration. Dark mode is default (no light mode). Color restraint reinforces premium positioning — two accent colors (purple + teal) with deep neutrals create visual hierarchy without saturation fatigue.

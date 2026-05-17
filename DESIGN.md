---
name: Modern Tech Lite
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#444748'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#b0007d'
  on-secondary: '#ffffff'
  secondary-container: '#dc009e'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#2e1500'
  on-tertiary-container: '#c66d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffd8e9'
  secondary-fixed-dim: '#ffafd7'
  on-secondary-fixed: '#3c0029'
  on-secondary-fixed-variant: '#8a0061'
  tertiary-fixed: '#ffdcc2'
  tertiary-fixed-dim: '#ffb77a'
  on-tertiary-fixed: '#2e1500'
  on-tertiary-fixed-variant: '#6d3a00'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  brand-magenta: '#EC0CAA'
  brand-orange: '#FF9933'
  surface-stroke: '#E5E7EB'
  text-muted: '#6B7280'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  button:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is engineered for a high-tier technology service provider, prioritizing clarity, technical precision, and a "Lite" aesthetic. The brand personality is authoritative yet approachable, characterized by a "Modern Tech" style that balances stark minimalism with sophisticated accents. 

The visual direction utilizes a high-contrast foundation—pure whites and deep blacks—interspersed with vibrant, high-energy chromatic accents to denote innovation and kinetic energy. The interface avoids unnecessary decoration, relying instead on intentional whitespace, refined typography, and subtle depth to guide the user through complex technical information.

## Colors

The color strategy for the design system revolves around a "Lite" high-contrast palette. 

- **Primary & Neutral:** The foundation is built on `#FFFFFF` (White) and `#111111` (Near-Black). This creates a stark, professional canvas that feels architectural and clean.
- **Accents:** We leverage the vibrant `#EC0CAA` (Magenta) for primary calls-to-action and key interactive states. The `#FF9933` (Orange) serves as a secondary accent for highlighting specific tech services or status indicators.
- **Surface Logic:** Backgrounds remain predominantly white. Sub-sections and containers use extremely light grays (`#F8F9FA`) to provide subtle grouping without breaking the minimalist flow.

## Typography

The typography system is designed for maximum legibility and a distinct "tech" feel.

- **Headlines:** Hanken Grotesk provides a sharp, contemporary geometric feel. Large displays use tight letter-spacing and heavy weights to command attention.
- **Body:** Inter is the workhorse for all long-form and UI text, chosen for its neutral, systematic appearance and exceptional readability at small sizes.
- **Labels & Mono:** JetBrains Mono is used sparingly for data points, metadata, and labels to inject a subtle developer/engineering aesthetic, reinforcing the company's technical core.

## Layout & Spacing

The design system utilizes a **12-column fixed grid** for desktop environments, transitioning to a fluid layout for mobile. 

- **Grid:** A 1280px max-width container keeps content centered and readable on ultra-wide monitors.
- **Rhythm:** An 8px base unit drives all spacing decisions. Gutters are fixed at 24px to provide "breathing room" between complex technical modules.
- **Responsive Behavior:** 
  - **Desktop (1024px+):** 12 columns, 40px side margins.
  - **Tablet (768px-1023px):** 8 columns, 24px side margins.
  - **Mobile (<767px):** 4 columns, 16px side margins. Stacked layouts are preferred over horizontal scrolling.

## Elevation & Depth

To maintain a "Lite" and professional feel, depth is conveyed through **Low-contrast outlines** and **Ambient shadows**.

- **Surfaces:** Most UI elements exist on the base "Level 0" white surface. Subtle elevation is achieved using a 1px border (`#E5E7EB`).
- **Shadows:** When depth is required (e.g., dropdowns, floating cards), use a "Soft-Focus" shadow: `0px 4px 20px rgba(0, 0, 0, 0.05)`. Shadows should never look heavy; they should feel like a subtle lift from the page.
- **Layering:** Tonal layering is used for sidebars or header backgrounds, utilizing `#F8F9FA` to differentiate from the primary content area without the weight of a shadow.

## Shapes

The shape language is "Soft," utilizing a 0.25rem (4px) corner radius as the standard. This choice avoids the overly playful nature of highly rounded corners while softening the "industrial" feel of sharp 90-degree angles.

- **Standard (4px):** Used for inputs, buttons, and small components.
- **Large (8px):** Used for cards and modals to provide a more distinct container feel.
- **Pill:** Reserved exclusively for tags, status chips, and toggle switches to differentiate them from actionable buttons.

## Components

- **Buttons:** Primary buttons use a solid `#111111` background with white text. Secondary buttons use a 1px `#111111` border with no fill. For high-impact actions, use the Magenta accent.
- **Inputs:** Fields are defined by a 1px `#E5E7EB` border. On focus, the border transitions to `#111111`. Labels use the Mono font for a technical touch.
- **Cards:** White background with a 1px light gray border. On hover, apply the Ambient shadow and a subtle translate-y (-2px) to provide interactive feedback.
- **Chips/Tags:** Small pill shapes with `#F8F9FA` backgrounds and `#6B7280` text. For "Active" status, use a light tint of the Orange or Magenta accents.
- **Lists:** Clean, border-bottom separated items. Use horizontal whitespace to separate labels from values, mimicking a technical specification sheet.
- **Navigation:** Transparent or white backgrounds with high-contrast black text. Use the Magenta accent for the active page indicator (a simple 2px bottom bar).

---
name: Technical Game Arena
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#4d4634'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#7e7762'
  outline-variant: '#d0c6ae'
  surface-tint: '#725c00'
  primary: '#725c00'
  on-primary: '#ffffff'
  primary-container: '#ffd84a'
  on-primary-container: '#735e00'
  inverse-primary: '#e9c336'
  secondary: '#003fd8'
  on-secondary: '#ffffff'
  secondary-container: '#2558ff'
  on-secondary-container: '#eaebff'
  tertiary: '#5a5e69'
  on-tertiary: '#ffffff'
  tertiary-container: '#d7dbe8'
  on-tertiary-container: '#5b606b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe07c'
  primary-fixed-dim: '#e9c336'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#564500'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b8c3ff'
  on-secondary-fixed: '#001355'
  on-secondary-fixed-variant: '#0036bc'
  tertiary-fixed: '#dee2ef'
  tertiary-fixed-dim: '#c2c6d3'
  on-tertiary-fixed: '#171c25'
  on-tertiary-fixed-variant: '#424751'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 84px
    fontWeight: '800'
    lineHeight: 88px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 24px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.01em
  label-ticker:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.08em
  label-badge:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-md: 2.5rem
  margin-lg: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-xxl: 4rem
---

## Brand & Style
This design system defines an energetic, neo-brutalist editorial digital arena tailored for college technical fests and engineering hackathons. Built for the AIDS (Artificial Intelligence & Data Science) and AIML (Artificial Intelligence & Machine Learning) departments, it channels raw hacker electricity, arcade mechanics, and poster-art typography. 

The aesthetic eschews generic SaaS tropes, soft blurred shadows, and muted corporate transparency in favor of uncompromising tactile weight: thick solid borders, hard-drop isometric projection shadows, punchy primary color blocks, high-contrast typography, and ticker-tape mechanical elements. The emotional response is tactile, playful, hyper-energetic, and unmistakably technical—evoking the thrill of high-stakes live esports, creative coding battles, and arcade cabinets.

## Colors
The palette is built around high-impact kinetic tension between vivid arcade yellow, electric cobalt blue, crisp ink black, and warm newsprint off-white.

- **Primary Canvas & Backgrounds**: Warm Off-White (`#FFFDF5`) acts as the foundational canvas for high contrast against black ink lines and elements.
- **Primary Accent (`#FFD84A`)**: A warm, ultra-saturated arcade yellow used for primary callouts, hero CTA badges, trophy elements, and active state highlights.
- **Secondary Accent (`#2457FF`)**: A hyper-vibrant royal cobalt blue reserved for technical badges, code interactive tags, AI-engine highlights, and secondary interactive states.
- **Ink & Strokes (`#111111`)**: Deep pitch black for crisp 3px and 4px mechanical borders, text hierarchies, and hard offset drop shadows.
- **Muted Blueprint Tint (`#EEF2FF`)**: A cool tinted lavender-blue base for subtle panel fills, secondary cards, and alternating table rows.
- **Code Terminal Surface (`#18191E`)**: A deep night-console surface engineered specifically for live code snippet editors, terminal feeds, and algorithmic logs.

## Typography
Typography is treated as structural architecture and graphic layout art. 

- **Display & Headlines (Space Grotesk)**: Tech-forward, bold, and geometric with brutalist undertones. Display lines should frequently utilize all-caps tracking, tight line heights, and stark scale contrast against body text.
- **Body & Content (Plus Jakarta Sans)**: Highly legible, rounded-geometric grotesque that softens long-form text, tournament rules, and problem statements without sacrificing energy.
- **Data, Terminal & Badges (JetBrains Mono)**: Monospaced code-level precision for game round timers, live coordinates, bracket seeds, and command-line code blocks.

## Layout & Spacing
The layout follows a 12-column modular grid with generous negative space contrasted against high-density content blocks.

- **Grid Architecture**: 12-column grid on desktop (1280px+ max container), 8 columns on tablet, and 4 columns on mobile. Columns are separated by 3px to 4px black vertical rules in dense dashboard sections.
- **Section Margins**: Outer margins scale from `1.5rem` on mobile to `4rem` on wide desktop screens to preserve poster-like framing.
- **Rhythm & Padding**: Modular cards use consistent internal padding (`space-lg` to `space-xl`) to anchor heavy black border outlines without content clipping. Element groupings maintain strict multi-step gaps to prevent visual clutter in high-contrast layouts.

## Elevation & Depth
Depth is strictly physical, geometric, and tangible—neo-brutalism disallows diffused ambient blur or soft multi-stop drop shadows.

- **Solid Offset Hard Shadows**: Surfaces lift off the canvas via directional solid black cast shadows at an exact 45-degree isometric angle:
  - **Flat/Static Elements**: Crisp `3px` or `4px` solid border with zero offset.
  - **Standard Cards & Containers**: `border-3 border-[#111111] shadow-[4px_4px_0px_0px_#111111]`.
  - **Interactive Focus & Active Cards**: `border-4 border-[#111111] shadow-[6px_6px_0px_0px_#111111]`.
  - **Floating Modals & Hero Feature Blocks**: `border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111]`.
- **Mechanical Interaction**: Interactive items physically depress on hover and click. On `:hover`, elements shift upward and leftward (`translate-x-[-2px] translate-y-[-2px]`) with an increased shadow offset. On `:active`, elements translate down and right (`translate-x-[4px] translate-y-[4px]`) while shadow collapses to `0px 0px 0px 0px`, simulating an arcade microswitch button press.

## Shapes
The design balances harsh brutalist edges with curved arcade softness. Containers and components maintain a deliberate `rounded-xl` (12px) to `rounded-2xl` (16px–18px) curvature, bounded by unyielding 3px or 4px jet-black borders. 

Pill shapes (`rounded-full`) are strictly reserved for live status badges, stage chips, and ticker tags. Code panels and interactive arcade pads retain uniform `rounded-xl` borders to maintain visual cohesion across the entire fest interface.

## Components

### 1. Chunky Physical Buttons
- **Primary Arcade Button**: Background `#FFD84A`, text `#111111`, `3px border-[#111111]`, `rounded-xl`, uppercase `Space Grotesk` font, `shadow-[4px_4px_0px_0px_#111111]`. On hover: lifts to `shadow-[6px_6px_0px_0px_#111111]`. On active: `shadow-none`, translated `4px` downward and rightward.
- **Secondary Action Button**: Background `#2457FF`, text `#FFFDF5`, `3px border-[#111111]`, `rounded-xl`, `shadow-[4px_4px_0px_0px_#111111]`.
- **Ghost/Outline Button**: Background `#FFFDF5`, text `#111111`, `3px border-[#111111]`, `rounded-xl`, `shadow-[4px_4px_0px_0px_#111111]`.

### 2. Cards & Arena Arenas
- **Tournament Stage Card**: Off-White `#FFFDF5` surface framed with `3px border-[#111111]`, `rounded-2xl`, and `shadow-[6px_6px_0px_0px_#111111]`. Headers feature distinct top borders or color-blocked title strips in `#FFD84A` or `#EEF2FF`.
- **Podium & Leaderboard Card**: Rank number framed in a heavy black circular badge, player avatar with 3px black stroke, and stat metrics set in `JetBrains Mono`.

### 3. Ticker Tapes & Marquees
- Infinite horizontal auto-scrolling ribbon banners with `#111111` background and `#FFD84A` text (or inverted `#FFD84A` fill with `#111111` text). Bounded on top and bottom by `3px` solid horizontal rules. Content displays live match results, AI challenge prompts, and department tags separated by bold geometric glyphs (`✦`, `▲`, `■`).

### 4. Stage & Status Chips
- Pill-shaped (`rounded-full`) tags with `2px border-[#111111]`.
- Active / Live chip: `#FFD84A` fill with a pulsing ink dot.
- AI/ML Track chip: `#EEF2FF` fill with `#2457FF` text.

### 5. Inputs & Interactive Controls
- Text inputs built on `#FFFDF5` with `3px border-[#111111]`, `rounded-xl`, and `shadow-[3px_3px_0px_0px_#111111]`. Focus state transitions to background `#FFFFFF` with yellow `#FFD84A` outer glow/stroke offset.
- Checkboxes & Radios: Oversized custom squares and circles with `3px border-[#111111]`. Checked state fills instantly with `#2457FF` or `#FFD84A` featuring a chunky black inner icon.

### 6. Code & Terminal Blocks
- Deep `#18191E` night-console container with `3px border-[#111111]`, `rounded-xl`, and `shadow-[6px_6px_0px_0px_#111111]`. Features an arcade-style top bar with decorative red/yellow/green window controls, file name in `JetBrains Mono`, and syntax highlighting optimized for Python, PyTorch, and SQL queries.
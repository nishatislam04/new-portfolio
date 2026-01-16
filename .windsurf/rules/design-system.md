---
trigger: always_on
---

# Design System Rules

## Color Palette

- **Primary**: Emerald (emerald-300, emerald-400, emerald-500)
- **Secondary**: Sky blue (sky-300, sky-400, sky-500)
- **Neutral**: Gray scale (gray-50 to gray-900)
- **Background**: Dark theme (gray-900 base)
- **Text**: White primary, gray variants for hierarchy

## Typography

- **Primary Font**: `var(--font-sans)` (system font stack)
- **Secondary Font**: `var(--font-serif)` for accents
- **Hierarchy**: Use Tailwind text sizes (text-sm, text-base, text-lg, etc.)

## Spacing & Layout

- **Breakpoints**: sm: 375px, md: 768px, lg: 1200px
- **Container**: Centered with responsive padding (1rem default, 2rem md+)
- **Sections**: Use consistent py-32 md:py-48 lg:py-60 for major sections

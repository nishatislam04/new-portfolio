---
trigger: always_on
---

# Windsurf Rules - Portfolio Project

## 🎯 Project Overview

This is a professional portfolio website built with Next.js, featuring a modern dark theme design system with emerald accents. The project emphasizes performance, accessibility, and consistent user experience.

## 🛠️ Tech Stack & Dependencies

- **Framework**: Next.js 15 Canary with App Router
- **Styling**: Tailwind CSS v3 with custom design tokens
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Custom SVG components with minified SVGs
- **Utilities**: clsx + tailwind-merge for class management
- **TypeScript**: Strict type checking enabled
- **Performance**: Sharp for image optimization

## 🎨 Design System Rules

### Color Palette

- **Primary**: Emerald (emerald-300, emerald-400, emerald-500)
- **Secondary**: Sky blue (sky-300, sky-400, sky-500)
- **Neutral**: Gray scale (gray-50 to gray-900)
- **Background**: Dark theme (gray-900 base)
- **Text**: White primary, gray variants for hierarchy

### Typography

- **Primary Font**: `var(--font-sans)` (system font stack)
- **Secondary Font**: `var(--font-serif)` for accents
- **Hierarchy**: Use Tailwind text sizes (text-sm, text-base, text-lg, etc.)

### Spacing & Layout

- **Breakpoints**: sm: 375px, md: 768px, lg: 1200px
- **Container**: Centered with responsive padding (1rem default, 2rem md+)
- **Sections**: Use consistent py-32 md:py-48 lg:py-60 for major sections

## 🧩 Component Architecture Rules

### 1. UI Components Structure

```bash
src/components/
├── ui/            # Base UI components (Button, Card, etc.)
├── animations/    # Reusable animation components
├── block/         # Complex composite components
├── accessibility/ # Accessibility-focused components
└── performance/   # Performance optimization components
```

### 2. Component Naming & Organization

- **PascalCase** for component files and names
- **Descriptive names** that indicate purpose
- **Export pattern**: Named exports from index files
- **Props interface**: Always define TypeScript interfaces

### 3. Base UI Component Rules

#### Button Component

```typescript
// Required props structure
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// Styling patterns
- Primary: bg-emerald-500 hover:bg-emerald-600
- Secondary: bg-white/10 hover:bg-white/20 with borders
- Ghost: text-gray-300 hover:text-white hover:bg-white/5
- Focus: focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
```

#### Card Component

```typescript
// Required variants
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered';
}

// Styling patterns
- Default: bg-gray-800/50 border border-gray-700/50
- Glass: bg-white/5 backdrop-blur-sm border border-white/10
- Bordered: bg-gray-800 border border-gray-700 hover:border-gray-600
- Structure: Card, CardHeader, CardContent, CardFooter
```

### 4. Animation Component Rules

#### FadeIn Animation

```typescript
interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

// Default values
- delay: 0
- duration: 0.6
- direction: "up"
- distance: 20
- viewport: { once: true, margin: "-50px" }
```

## 📁 File Structure Rules

### 1. Directory Organization

```bash
src/
├── app/          # Next.js App Router pages
├── components/   # Reusable components
├── sections/     # Page sections (Hero, About, etc.)
├── constants/    # Static data and configuration
├── assets/       # Images, icons, static files
├── hooks/        # Custom React hooks
├── lib/          # Third-party library configurations
├── utils/        # Utility functions
└── actions/      # Server actions
```

### 2. Import Rules

- **Absolute imports**: Use `@/` prefix for all internal imports
- **Import order**: External libraries → Internal components → Assets
- **Barrel exports**: Use index.ts files for clean imports

## 🎭 Animation & Interaction Rules

### 1. Animation Principles

- **Performance first**: Use transform and opacity for animations
- **Consistent timing**: 0.6s duration for most transitions
- **Easing**: Use ease-out for entrances, ease-in for exits
- **Viewport animations**: Use `whileInView` with `once: true`

### 2. Hover & Focus States

- **Buttons**: Scale, color, and shadow transitions
- **Cards**: Border color and background opacity changes
- **Links**: Color transitions with emerald accent
- **Focus**: Always include focus rings for accessibility

### 3. Loading & Performance

- **Image optimization**: Use Next.js Image component with priority for above-fold
- **Lazy loading**: Default for below-fold content
- **Animation performance**: Prefer CSS transforms over layout changes

## 🔧 Code Quality Rules

### 1. TypeScript Standards

- **Strict mode**: Enable all strict TypeScript options
- **Interface definitions**: Always define props interfaces
- **Type exports**: Export types when used across files
- **No any types**: Use proper typing or unknown

### 2. Component Best Practices

```typescript
// Component template
import { forwardRef } from 'react';
import { cn } from '@/utils';

interface ComponentProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'alternative';
  children: React.ReactNode;
}

const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <element
        className={cn(baseStyles, variants[variant], className)}
        ref={ref}
        {...props}
      >
        {children}
      </element>
    );
  }
);

Component.displayName = 'Component';
export { Component };
```

### 3. Styling Rules

- **Utility-first**: Use Tailwind utilities over custom CSS
- **Class merging**: Always use `cn()` utility for conditional classes
- **Responsive design**: Mobile-first approach with sm, md, lg breakpoints
- **Dark theme**: Default dark theme with light accents

### 4. Performance Rules

- **Bundle optimization**: Use dynamic imports for heavy components
- **Image optimization**: Proper sizing and format selection
- **Code splitting**: Separate animations and heavy features
- **Caching**: Implement proper caching strategies

## 🎯 UX/UI Consistency Rules

### 1. Visual Hierarchy

- **Headings**: Use consistent text sizes and weights
- **Spacing**: Follow 8px grid system (space-2, space-4, space-8, etc.)
- **Contrast**: Ensure WCAG AA compliance for text contrast
- **Focus indicators**: Visible focus states for all interactive elements

### 2. Interactive Elements

- **Feedback**: Immediate visual feedback for all interactions
- **Loading states**: Show loading indicators for async operations
- **Error handling**: Consistent error message styling and placement
- **Success states**: Clear confirmation for completed actions

### 3. Content Guidelines

- **Microcopy**: Professional, concise, and helpful text
- **Error messages**: Specific and actionable
- **Button labels**: Action-oriented and clear
- **Alt text**: Descriptive for all images

## 🚀 Development Workflow Rules

### 1. Component Development

- **Design first**: Review existing components for patterns
- **Reusability**: Build components to be reusable
- **Documentation**: Include JSDoc comments for complex components
- **Testing**: Ensure components work across breakpoints

### 2. Code Review Standards

- **Consistency**: Follow established patterns
- **Performance**: Check for unnecessary re-renders
- **Accessibility**: Verify keyboard navigation and screen readers
- **Mobile**: Test on mobile devices

## 📱 Responsive Design Rules

### 1. Breakpoint Strategy

- **Mobile first**: Design for mobile, enhance for larger screens
- **Touch targets**: Minimum 44px for interactive elements
- **Readable text**: Minimum 16px font size on mobile
- **Spacing**: Adequate spacing between interactive elements

### 2. Layout Patterns

- **Grid systems**: Use CSS Grid and Flexbox appropriately
- **Container queries**: Consider container-based responsive design
- **Fluid typography**: Use clamp() for scalable text
- **Aspect ratios**: Maintain proper aspect ratios across devices

## 🔍 Accessibility Rules

### 1. Semantic HTML

- **Proper headings**: Logical heading hierarchy (h1 → h2 → h3)
- **Landmarks**: Use semantic HTML5 elements
- **Form labels**: Proper labeling for all form inputs
- **Alt text**: Descriptive alternative text for images

### 2. Keyboard Navigation

- **Tab order**: Logical tab sequence
- **Focus management**: Proper focus handling in modals/dropdowns
- **Skip links**: Provide skip navigation options
- **Keyboard shortcuts**: Document any custom shortcuts

### 3. Screen Reader Support

- **ARIA labels**: Use ARIA attributes when needed
- **Live regions**: Announce dynamic content changes
- **Hidden content**: Properly hide decorative elements
- **Context**: Provide sufficient context for interactive elements

## 🎨 When Creating New UI Components

### 1. Before Creating

- **Check existing**: Review current components for similar functionality
- **Design consistency**: Ensure new component fits the design system
- **Reusability**: Design for multiple use cases
- **Accessibility**: Plan for keyboard and screen reader users

### 2. Component Checklist

- [ ] TypeScript interface defined
- [ ] Variants and sizes implemented
- [ ] Responsive design tested
- [ ] Accessibility features included
- [ ] Animation states considered
- [ ] Error states handled
- [ ] Loading states implemented
- [ ] Focus states styled

### 3. Documentation Requirements

- [ ] Props interface documented
- [ ] Usage examples provided
- [ ] Variant demonstrations included
- [ ] Accessibility notes added
- [ ] Performance considerations noted

---

### Never do:

- **run local server**: after implementing feature, never start or restart local server to test as the local server was always running

---

## 🎯 Summary

These rules ensure consistent, professional, and accessible UI components that align with the portfolio's design system. Always prioritize user experience, performance, and maintainability when developing new features.

**Remember**: Consistency is key to a professional portfolio. Every component should feel like part of a cohesive system, not a collection of disparate elements.

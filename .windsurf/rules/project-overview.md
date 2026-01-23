---
trigger: always_on
---

# Windsurf Rules - Portfolio Project

## Tech Stack & Dependencies

- **Framework**: Next.js version 16.1 Canary with App Router
- **Styling**: Tailwind CSS v4
- **Icons**: Custom SVG components with minified SVGs + Lucide React Icons
- **Utilities**: clsx + tailwind-merge for class management
- **UI component**: using latest shadcn/ui components and it's best practices
- **Database**: using prisma orm with postgresql local docker database

### 2. Component Naming & Organization

- **file-naming**: kebab-case for component files naming
- **component-naming**: PascalCase for react component naming
- **Descriptive names** for react components to indicate purpose
- **Export pattern**: Default export whenever possible
- **Props interface**: create a new types file for props in the types directory. and if file exists, add the props to the existing file
- **related components**: create _components directory for related components in the same directory as the parent component

## Code Quality Rules

### 1. TypeScript Standards

- **type definitions**: Always define props types
- **Type exports**: Export types when used across files
- **No any types**: Use proper typing or unknown

### 4. Performance Rules

- **Image optimization**: follow nextjs image optimization guidelines
- **Code splitting**: create a separate componets based on its responsibility
- **Caching**: Implement proper nextjs caching strategies. cache components. and ignore react caching strategies

## Development Workflow Rules

### 1. Component Development

- **Design first**: Review existing components for patterns
- **Documentation**: Include JSDoc comments for complex components and complex functions
- **install missing ui components**: Install missing ui components from shadcn/ui or other sources
- **boundary**: try to stay as much as possible in server boundary and only introduce client boundary when needed for better speed and performance.

## When Creating New UI Components

### 1. Before Creating

- **Check existing**: Review current components for similar functionality
- **Design consistency**: Ensure new component fits the design system
- **Reusability**: Design for multiple use cases
- **Accessibility**: Plan for keyboard and screen reader users

---

### Never do

- **run local server**: after implementing feature, never start or restart local dev server to test. as the local server was always running on [port 3000](http://192.168.1.108:3000)

---

### Project bootstrap details

Project runs Next.js dev server bound to host 192.168.0.104 on port 3000 (-H 192.168.0.104). Use this when invoking MCP/browser to target [http://192.168.1.108:3000](http://192.168.1.108:3000). MCP Next.js tools are available for server management.

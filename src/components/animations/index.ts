"use client";

import dynamic from "next/dynamic";

// Defer framer-motion bundles on the client. These components are
// animation-only; disable SSR so they don't add to server payloads
// and are only loaded when needed on the client.

export const StaggerContainer = dynamic(() => import("./StaggerContainer").then(m => m.StaggerContainer), {
  ssr: false,
  loading: () => null,
});

export const FadeIn = dynamic(() => import("./FadeIn").then(m => m.FadeIn), {
  ssr: false,
  loading: () => null,
});

export const FadeInOnScroll = dynamic(() => import("./FadeInOnScroll").then(m => m.FadeInOnScroll), {
  ssr: false,
  loading: () => null,
});

export const TechStackCard = dynamic(() => import("./TechStackCard").then(m => m.TechStackCard), {
  ssr: false,
  loading: () => null,
});

const AnimatedCounter = dynamic(() => import("./AnimatedCounter"), {
  ssr: false,
  loading: () => null,
});

export { AnimatedCounter };

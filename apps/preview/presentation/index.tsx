'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// Authored demo compositions live outside vendor-root so catalogue imports
// cannot overwrite the presentation fixes or alter redistributed source.
export const presentationPreviews: Record<string, ComponentType> = {
  'magicui/magicui-interactive-hover-button': dynamic(() => import('./buttons').then((m) => m.HoverButtonPreview), { ssr: false }),
  'magicui/magicui-ripple-button': dynamic(() => import('./buttons').then((m) => m.RipplePreview), { ssr: false }),
  'magicui/magicui-pulsating-button': dynamic(() => import('./buttons').then((m) => m.PulsatingPreview), { ssr: false }),
  'magicui/magicui-rainbow-button': dynamic(() => import('./buttons').then((m) => m.RainbowPreview), { ssr: false }),
  'magicui/magicui-shiny-button': dynamic(() => import('./buttons').then((m) => m.ShinyPreview), { ssr: false }),
  'magicui/magicui-shimmer-button': dynamic(() => import('./buttons').then((m) => m.ShimmerPreview), { ssr: false }),
  'magicui/magicui-animated-subscribe-button': dynamic(() => import('./interactive').then((m) => m.SubscribePreview), { ssr: false }),
  'magicui/magicui-glyph-matrix': dynamic(() => import('./interactive').then((m) => m.GlyphPreview), { ssr: false }),
  'magicui/magicui-confetti': dynamic(() => import('./interactive').then((m) => m.ConfettiPreview), { ssr: false }),
  'kibo/kibo-glimpse': dynamic(() => import('./interactive').then((m) => m.GlimpsePreview), { ssr: false }),
  'kibo/kibo-tree': dynamic(() => import('./tree').then((m) => m.TreePreview), { ssr: false }),
  'kibo/kibo-stories-video': dynamic(() => import('./media').then((m) => m.StoriesVideoPreview), { ssr: false }),
  'kibo/kibo-stories': dynamic(() => import('./media').then((m) => m.StoriesPreview), { ssr: false }),
  'kibo/kibo-deck': dynamic(() => import('./media').then((m) => m.DeckPreview), { ssr: false }),
  'kibo/kibo-comparison': dynamic(() => import('./media').then((m) => m.ComparisonPreview), { ssr: false }),
  'kibo/kibo-image-zoom': dynamic(() => import('./media').then((m) => m.ImageZoomPreview), { ssr: false }),
};

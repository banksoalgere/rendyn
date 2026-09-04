'use client';

import { useState, type ReactNode } from 'react';
import { ShimmerButton } from '../vendor-root/components/magicui/shimmer-button';
import { ShinyButton } from '../vendor-root/components/magicui/shiny-button';
import { RainbowButton } from '../vendor-root/components/magicui/rainbow-button';
import { PulsatingButton } from '../vendor-root/components/magicui/pulsating-button';
import { RippleButton } from '../vendor-root/components/magicui/ripple-button';
import { InteractiveHoverButton } from '../vendor-root/components/magicui/interactive-hover-button';

function ButtonDemo({ children }: { children: (activate: () => void) => ReactNode }) {
  const [clicks, setClicks] = useState(0);
  return <div className="demo-button-stage">
    {children(() => setClicks((value) => value + 1))}
    <p aria-live="polite">{clicks ? `Button activated ${clicks} ${clicks === 1 ? 'time' : 'times'}. Try it again.` : 'Hover, click, or press Enter to try it.'}</p>
  </div>;
}

export function ShimmerPreview() { return <ButtonDemo>{(activate) => <ShimmerButton onClick={activate}>Get started</ShimmerButton>}</ButtonDemo>; }
export function ShinyPreview() { return <ButtonDemo>{(activate) => <ShinyButton onClick={activate}>Continue</ShinyButton>}</ButtonDemo>; }
export function RainbowPreview() { return <ButtonDemo>{(activate) => <RainbowButton onClick={activate} size="lg">Get started</RainbowButton>}</ButtonDemo>; }
export function PulsatingPreview() { return <ButtonDemo>{(activate) => <PulsatingButton onClick={activate}>Get started</PulsatingButton>}</ButtonDemo>; }
export function RipplePreview() { return <ButtonDemo>{(activate) => <RippleButton onClick={activate} rippleColor="#c4b5fd">Click me</RippleButton>}</ButtonDemo>; }
export function HoverButtonPreview() { return <ButtonDemo>{(activate) => <InteractiveHoverButton onClick={activate}>Get started</InteractiveHoverButton>}</ButtonDemo>; }

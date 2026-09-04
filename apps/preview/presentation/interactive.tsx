'use client';

import { useRef, useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedSubscribeButton } from '../vendor-root/components/magicui/animated-subscribe-button';
import { GlyphMatrix } from '../vendor-root/components/magicui/glyph-matrix';
import { Confetti, type ConfettiRef } from '../vendor-root/components/magicui/confetti';
import { Glimpse, GlimpseTrigger, GlimpseContent, GlimpseTitle, GlimpseDescription } from '../vendor-root/components/kibo-ui/glimpse';

export function SubscribePreview() {
  const [subscribed, setSubscribed] = useState(false);
  return <div className="demo-button-stage demo-subscribe-button">
    <AnimatedSubscribeButton subscribeStatus={subscribed} onClick={() => setSubscribed(!subscribed)} aria-pressed={subscribed}>
      <span>Subscribe <ArrowRight size={16} /></span>
      <span>Subscribed <Check size={16} /></span>
    </AnimatedSubscribeButton>
    <p aria-live="polite">{subscribed ? 'Subscribed. Click again to reset the example.' : 'Click to preview the subscribed state.'}</p>
  </div>;
}

export function GlyphPreview() {
  const [running, setRunning] = useState(true);
  return <div className="demo-glyph">
    {running && <GlyphMatrix color="#a99af5" cellSize={20} aria-label="Animated glyph matrix" />}
    <div className="demo-glyph-copy"><span className="demo-eyebrow">Generative motion</span><h2>Order in the noise.</h2><p>A living canvas of shifting characters.</p><button className="demo-button" onClick={() => setRunning(!running)}>{running ? 'Pause animation' : 'Resume animation'}</button></div>
  </div>;
}

export function ConfettiPreview() {
  const confetti = useRef<ConfettiRef>(null);
  const [count, setCount] = useState(0);
  return <div className="demo-panel demo-celebrate">
    <Confetti ref={confetti} manualstart className="demo-confetti" />
    <span className="demo-icon"><Check size={24} /></span>
    <span className="demo-eyebrow">A small celebration</span><h2>You shipped it.</h2><p>Good work deserves a little confetti.</p>
    <button className="demo-button" onClick={() => { confetti.current?.fire({ particleCount: 90, spread: 75 }); setCount((value) => value + 1); }}>Celebrate <Sparkles size={16} /></button>
    <small aria-live="polite">{count ? `Celebrated ${count} ${count === 1 ? 'time' : 'times'}. Go again?` : 'Click to try the animation.'}</small>
  </div>;
}

export function GlimpsePreview() {
  const [open, setOpen] = useState(false);
  return <div className="demo-panel demo-link-preview">
    <span className="demo-eyebrow">Reading list</span><h2>Keep the context.</h2><p>A little more information, right where you need it.</p>
    <Glimpse open={open} onOpenChange={setOpen}>
      <GlimpseTrigger asChild><button className="demo-link" onClick={() => setOpen(true)} onFocus={() => setOpen(true)} aria-expanded={open}>Explore the component collection <ArrowRight size={16} /></button></GlimpseTrigger>
      <GlimpseContent className="demo-glimpse-content" side="top" align="center">
        <span className="demo-eyebrow">Rendyn / Collection</span><GlimpseTitle>Small details. Better interfaces.</GlimpseTitle><GlimpseDescription>Browse interactive components for navigation, feedback, and everyday product flows.</GlimpseDescription>
      </GlimpseContent>
    </Glimpse>
    <small>Hover, focus, or tap the link to preview.</small>
  </div>;
}

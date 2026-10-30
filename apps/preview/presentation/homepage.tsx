'use client';

import { useState } from 'react';
import { CylinderCarousel } from '../vendor-root/components/motion/cylinder-carousel';
import { MeshGradient, Warp, GrainGradient, Waves } from '@paper-design/shaders-react';
import { useReducedMotion } from 'motion/react';
import { Tabs, TabsList, TabsTrigger } from '../vendor-root/components/motion/tabs';
import { DockPreview } from '../vendor-root/components/previews/motion/dock.preview';
import styles from './homepage.module.css';

const surfaces = [
  { id: 'mesh', label: 'Mesh' },
  { id: 'warp', label: 'Warp' },
  { id: 'grain', label: 'Grain' },
  { id: 'waves', label: 'Waves' },
] as const;
type SurfaceKind = (typeof surfaces)[number]['id'];

function Surface({ kind }: { kind: SurfaceKind }) {
  const reducedMotion = useReducedMotion();
  switch (kind) {
    case 'mesh':
      return <MeshGradient colors={['#e0eaff', '#241d9a', '#f75092', '#9f50d3']} speed={reducedMotion ? 0 : 0.3} className={styles.surface} />;
    case 'warp':
      return <Warp colors={['#c8ff00', '#3a5a00', '#c8ff00', '#88bb00']} speed={reducedMotion ? 0 : 0.4} className={styles.surface} />;
    case 'grain':
      return <GrainGradient colors={['#ff7a00', '#ff2e93', '#ffce54', '#8a2be2']} colorBack="#1a0500" softness={0.7} speed={reducedMotion ? 0 : 0.4} className={styles.surface} />;
    case 'waves':
      return <Waves colorFront="#8d9bff" colorBack="#131330" className={styles.surface} />;
  }
}

/** Compact compositions of the catalogue primitives, sized for the homepage frame. */
export function HomeCarouselPreview() {
  const [variant, setVariant] = useState<'concave' | 'convex'>('concave');

  return (
    <div className={styles.carousel}>
      <Tabs value={variant} onValueChange={(value) => {
        if (value === 'concave' || value === 'convex') setVariant(value);
      }} variant="segment">
        <TabsList><TabsTrigger value="concave">Concave</TabsTrigger><TabsTrigger value="convex">Convex</TabsTrigger></TabsList>
      </Tabs>
      <CylinderCarousel variant={variant} itemSize={150} visibleItems={3} height={220} autoRotate autoRotateSpeed={0.16} className={styles.carouselTrack}>
        {surfaces.map(({ id }) => <div className={styles.orb} key={id}><Surface kind={id} /></div>)}
      </CylinderCarousel>
      <p className={styles.hint}>Drag or use the arrow keys</p>
    </div>
  );
}

export function HomeShaderPreview() {
  const [active, setActive] = useState<SurfaceKind>('mesh');

  return (
    <div className={styles.shader}>
      <div className={styles.shaderCanvas}><Surface key={active} kind={active} /></div>
      <Tabs value={active} onValueChange={(value) => {
        const next = surfaces.find(({ id }) => id === value);
        if (next) setActive(next.id);
      }} variant="segment">
        <TabsList>{surfaces.map(({ id, label }) => <TabsTrigger value={id} key={id}>{label}</TabsTrigger>)}</TabsList>
      </Tabs>
    </div>
  );
}

export function HomeDockPreview() {
  return <DockPreview />;
}

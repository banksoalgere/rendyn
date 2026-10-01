"use client";

import { Wrapper } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Spoiler/_wrapper';

function Demo() {
  return <Wrapper transitionDuration={0} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

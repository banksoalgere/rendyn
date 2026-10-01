"use client";

import { AngleSlider } from '@mantine/core';

function Wrapper(props: any) {
  return <AngleSlider aria-label="Angle slider" {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent size={60} thumbSize={8} withLabel={true} />; }

"use client";

import { GaugeChart } from '@mantine/charts';

import { sections, sectionsCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/GaugeChart/_data';

function Demo() {
  return <GaugeChart value={72} target={75} sections={sections} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

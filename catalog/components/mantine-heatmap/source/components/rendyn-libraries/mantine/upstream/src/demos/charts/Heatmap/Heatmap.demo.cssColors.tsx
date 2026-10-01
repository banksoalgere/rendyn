"use client";

import { Heatmap } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/Heatmap/_data';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/Heatmap/Heatmap.demo.cssColors.module.css';

function Demo() {
  return <Heatmap classNames={classes} data={data} startDate="2024-02-16" endDate="2025-02-16" />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

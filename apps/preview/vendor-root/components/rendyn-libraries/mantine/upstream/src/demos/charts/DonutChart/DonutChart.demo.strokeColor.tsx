"use client";

import { DonutChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/DonutChart/_data';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/DonutChart/DonutChart.demo.strokeColor.module.css';

function Demo() {
  return (
    <div className={classes.root}>
      <DonutChart data={data} strokeColor="var(--card-bg)" />
    </div>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

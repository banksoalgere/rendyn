"use client";

import { PieChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/PieChart/_data';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/PieChart/PieChart.demo.strokeColor.module.css';

function Demo() {
  return (
    <div className={classes.root}>
      <PieChart data={data} strokeColor="var(--card-bg)" />
    </div>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { FunnelChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/FunnelChart/_data';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/FunnelChart/FunnelChart.demo.strokeColor.module.css';

function Demo() {
  return (
    <div className={classes.root}>
      <FunnelChart data={data} strokeColor="var(--card-bg)" />
    </div>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

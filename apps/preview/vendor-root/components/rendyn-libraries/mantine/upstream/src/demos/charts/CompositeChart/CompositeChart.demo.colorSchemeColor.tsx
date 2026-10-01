"use client";

import { CompositeChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/CompositeChart/_data';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/CompositeChart/CompositeChart.demo.colorSchemeColor.module.css';

function Demo() {
  return (
    <CompositeChart
      h={300}
      data={data}
      dataKey="date"
      className={classes.root}
      series={[{ name: 'Apples', color: 'var(--chart-color)', type: 'line' }]}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

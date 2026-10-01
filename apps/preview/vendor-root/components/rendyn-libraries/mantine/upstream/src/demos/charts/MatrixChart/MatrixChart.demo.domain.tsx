"use client";

import { MatrixChart } from '@mantine/charts';

import { data, dataCode, xLabels, yLabels } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/MatrixChart/_data';

function Demo() {
  return (
    <MatrixChart
      data={data}
      xLabels={xLabels}
      yLabels={yLabels}
      withYLabels
      withXLabels
      domain={[0, 50]}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

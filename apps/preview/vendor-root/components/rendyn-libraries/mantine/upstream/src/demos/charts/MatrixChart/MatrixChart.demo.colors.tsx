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
      colors={[
        'var(--mantine-color-orange-2)',
        'var(--mantine-color-orange-4)',
        'var(--mantine-color-orange-6)',
        'var(--mantine-color-orange-9)',
      ]}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

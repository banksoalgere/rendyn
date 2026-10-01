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
      getCellProps={(cell) => {
        if (cell.value === null) {
          return {};
        }

        if (cell.value >= 25) {
          return { fill: 'var(--mantine-color-teal-6)' };
        }

        if (cell.value >= 15) {
          return { fill: 'var(--mantine-color-yellow-6)' };
        }

        return { fill: 'var(--mantine-color-red-6)' };
      }}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

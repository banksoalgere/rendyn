"use client";

import { BarsList } from '@mantine/charts';

import { Tooltip } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/BarsList/_data';

function Demo() {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <BarsList
      data={data}
      barsLabel="Traffic Source"
      valueLabel="Visits"
      renderBar={(barData, defaultBar) => {
        const percentage = ((barData.value / maxValue) * 100).toFixed(1);

        return (
          <Tooltip label={`${barData.name}: ${percentage}% of total traffic`} position="top-start">
            {defaultBar}
          </Tooltip>
        );
      }}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

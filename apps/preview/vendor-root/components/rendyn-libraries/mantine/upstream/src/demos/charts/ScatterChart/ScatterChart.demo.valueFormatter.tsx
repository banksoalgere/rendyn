"use client";

import { ScatterChart } from '@mantine/charts';

import { spendingsData, spendingsDataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/ScatterChart/_data';

function Demo() {
  return (
    <ScatterChart
      h={350}
      data={spendingsData}
      dataKey={{ x: 'age', y: 'average_monthly_spending' }}
      yAxisProps={{ domain: [800, 3400] }}
      valueFormatter={{
        x: (value) => `${value} years`,
        y: (value) => `$${new Intl.NumberFormat('en-US').format(value)}`,
      }}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

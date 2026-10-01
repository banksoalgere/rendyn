"use client";

import { RadarChart } from '@mantine/charts';

import { multiData, multiDataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/RadarChart/_data';

function Demo(props: any) {
  return (
    <RadarChart
      h={300}
      data={multiData}
      dataKey="product"
      withPolarRadiusAxis
      series={[
        { name: 'Sales January', color: 'lime.4', opacity: 0.1 },
        { name: 'Sales February', color: 'cyan.4', opacity: 0.1 },
      ]}
      {...props}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent withPolarGrid={true} withPolarAngleAxis={true} withPolarRadiusAxis={true} withTooltip={false} withDots={false} />; }

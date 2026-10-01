"use client";

import { BarChart } from '@mantine/charts';

import { useMediaQuery } from '@mantine/hooks';

import { overlayData, overlayDataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/BarChart/_data';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/BarChart/BarChart.demo.overlay.module.css';

function Demo() {
  const bigBarWidth = useMediaQuery('(min-width: 48em)') ? 42 : 26;
  const ratio = 0.5;
  const smallBarWidth = bigBarWidth * ratio;
  const barGap = (bigBarWidth + smallBarWidth) / -2;

  return (
    <BarChart
      h={300}
      data={overlayData}
      dataKey="index"
      barChartProps={{ barGap }}
      barProps={(data) => ({ barSize: data.name === 'you' ? bigBarWidth : smallBarWidth })}
      classNames={classes}
      series={[
        { name: 'you', color: 'var(--you-bar-color)' },
        { name: 'average', color: 'var(--average-bar-color)' },
      ]}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

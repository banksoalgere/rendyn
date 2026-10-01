"use client";

import { getTimeRange, TimeGrid } from '@mantine/dates';

function Wrapper(props: any) {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '10:00', endTime: '21:00', interval: '01:00' })}
      simpleGridProps={{
        type: 'container',
        cols: { base: 1, '180px': 2, '320px': 3 },
        spacing: 'xs',
      }}
      {...props}
    />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent format={"24h"} withSeconds={false} size={"sm"} radius={"sm"} />; }

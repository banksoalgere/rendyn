"use client";

import { FunnelChart } from '@mantine/charts';

import { Center } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/FunnelChart/_data';

function Wrapper(props: any) {
  return (
    <Center mih={300}>
      <FunnelChart {...props} data={data} />
    </Center>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent size={160} />; }

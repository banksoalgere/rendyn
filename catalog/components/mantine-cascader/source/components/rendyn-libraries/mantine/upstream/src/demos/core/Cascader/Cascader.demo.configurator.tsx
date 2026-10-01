"use client";

import { Cascader, useMatches } from '@mantine/core';

import { data } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Cascader/data';

function Wrapper(props: any) {
  const withColumns = useMatches({ base: false, sm: true });
  return <Cascader {...props} withColumns={withColumns} placeholder="Pick location" data={data} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

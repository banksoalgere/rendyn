"use client";

import { TreeSelect } from '@mantine/core';

import { data } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/TreeSelect/data';

function Wrapper(props: any) {
  return <TreeSelect {...props} placeholder="Pick value" data={data} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

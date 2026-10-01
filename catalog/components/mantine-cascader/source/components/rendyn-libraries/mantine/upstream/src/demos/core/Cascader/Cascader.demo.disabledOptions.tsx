"use client";

import { Cascader, CascaderOption, useMatches } from '@mantine/core';

const data: CascaderOption[] = [
  {
    value: 'asia',
    label: 'Asia',
    children: [
      { value: 'jp', label: 'Japan', children: [{ value: 'tokyo', label: 'Tokyo' }] },
      { value: 'kr', label: 'South Korea', disabled: true },
    ],
  },
  { value: 'antarctica', label: 'Antarctica', disabled: true },
];

function Demo() {
  const withColumns = useMatches({ base: false, sm: true });
  return (
    <Cascader withColumns={withColumns} label="Location" placeholder="Pick location" data={data} />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

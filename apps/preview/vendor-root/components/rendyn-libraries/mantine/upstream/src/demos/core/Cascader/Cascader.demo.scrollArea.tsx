"use client";

import { Cascader, CascaderOption } from '@mantine/core';

const cities = Array.from({ length: 30 }, (_, index) => ({
  value: `city-${index + 1}`,
  label: `City ${index + 1}`,
}));

const data: CascaderOption[] = [
  { value: 'asia', label: 'Asia', children: [{ value: 'jp', label: 'Japan', children: cities }] },
  {
    value: 'europe',
    label: 'Europe',
    children: [{ value: 'fr', label: 'France', children: cities }],
  },
];

function Demo() {
  return (
    <Cascader
      label="Location"
      placeholder="Pick location"
      defaultValue={['asia', 'jp']}
      maxDropdownHeight={180}
      data={data}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

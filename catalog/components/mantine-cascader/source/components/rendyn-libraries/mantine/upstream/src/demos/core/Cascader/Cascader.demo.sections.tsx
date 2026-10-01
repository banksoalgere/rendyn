"use client";

import { MapPinIcon } from '@phosphor-icons/react';

import { Cascader, useMatches } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Cascader/data';

function Demo() {
  const withColumns = useMatches({ base: false, sm: true });
  return (
    <Cascader
      withColumns={withColumns}
      label="Location"
      placeholder="Pick location"
      leftSectionPointerEvents="none"
      leftSection={<MapPinIcon size={16} />}
      data={data}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

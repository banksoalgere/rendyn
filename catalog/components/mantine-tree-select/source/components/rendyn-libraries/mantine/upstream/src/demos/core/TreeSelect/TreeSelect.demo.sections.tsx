"use client";

import { SquaresFourIcon } from '@phosphor-icons/react';

import { TreeSelect } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/TreeSelect/data';

function Demo() {
  const icon = <SquaresFourIcon size={16} />;
  return (
    <>
      <TreeSelect
        data={data}
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="Your favorite item"
        placeholder="Your favorite item"
      />
      <TreeSelect
        mt="md"
        data={data}
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="Your favorite item"
        placeholder="Your favorite item"
      />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

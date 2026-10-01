"use client";

import { Button, TreeSelect } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

import type { MantineDemo } from '@mantinex/demo';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/TreeSelect/data';

const code = `
import { TreeSelect, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { data } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/TreeSelect/data';

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();
  return (
    <>
      <Button onClick={toggle} mb="md">
        Toggle dropdown
      </Button>

      <TreeSelect
        label="Your favorite item"
        placeholder="Pick value"
        data={data}
        dropdownOpened={dropdownOpened}
      />
    </>
  );
}
`;

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();
  return (
    <>
      <Button onClick={toggle} mb="md">
        Toggle dropdown
      </Button>

      <TreeSelect
        label="Your favorite item"
        placeholder="Pick value"
        data={data}
        dropdownOpened={dropdownOpened}
      />
    </>
  );
}

export const dropdownOpened: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
  maxWidth: 340,
  centered: true,
};
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

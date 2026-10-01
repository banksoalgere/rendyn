"use client";

import { Button, Popover, Text } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Popover width={200} {...props}>
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">Disabled popover dropdown is always hidden</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent disabled={false} />; }

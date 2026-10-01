"use client";

import { Button, Popover, Text } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Popover width={200} opened position="bottom-start" withArrow {...props}>
      <Popover.Target>
        <Button>Target element</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">Arrow position can be changed for *-start and *-end positions</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent arrowPosition={"center"} arrowOffset={10} arrowSize={7} arrowRadius={0} />; }

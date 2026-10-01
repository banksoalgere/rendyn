"use client";

import { Button, Popover, Text } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Popover
      width={200}
      position={props.position}
      opened
      offset={{ mainAxis: props.mainAxis, crossAxis: props.crossAxis }}
    >
      <Popover.Target>
        <Button>Popover target</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">
          Change position and offset to configure dropdown offset relative to target
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent position={"bottom"} mainAxis={0} crossAxis={0} />; }

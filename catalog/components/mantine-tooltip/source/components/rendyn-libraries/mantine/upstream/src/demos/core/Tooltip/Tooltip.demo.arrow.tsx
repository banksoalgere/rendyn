"use client";

import { Button, Tooltip } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Tooltip label="Tooltip" withArrow opened position="top-start" {...props}>
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent arrowPosition={"center"} arrowOffset={10} arrowSize={4} arrowRadius={0} />; }

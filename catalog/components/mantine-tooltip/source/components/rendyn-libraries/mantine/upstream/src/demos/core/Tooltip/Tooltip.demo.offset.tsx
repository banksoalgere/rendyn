"use client";

import { Button, Tooltip } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Tooltip label="Tooltip" opened {...props}>
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent position={"top"} offset={5} />; }

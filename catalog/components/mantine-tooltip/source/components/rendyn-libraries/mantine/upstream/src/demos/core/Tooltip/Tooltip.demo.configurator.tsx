"use client";

import { Button, Tooltip } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Tooltip label="Tooltip" {...props}>
      <Button>With tooltip</Button>
    </Tooltip>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} />; }

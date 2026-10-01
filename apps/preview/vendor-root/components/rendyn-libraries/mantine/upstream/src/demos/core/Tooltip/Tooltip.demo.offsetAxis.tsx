"use client";

import { Button, Tooltip } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Tooltip
      position={props.position}
      opened
      label="Tooltip"
      offset={{ mainAxis: props.mainAxis, crossAxis: props.crossAxis }}
    >
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent position={"top"} mainAxis={5} crossAxis={0} />; }

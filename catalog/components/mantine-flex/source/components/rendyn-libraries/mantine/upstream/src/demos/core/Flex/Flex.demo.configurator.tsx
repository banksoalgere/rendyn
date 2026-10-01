"use client";

import { Button, Flex, FlexProps } from '@mantine/core';

function Wrapper(props: FlexProps) {
  return (
    <Flex mih={50} bg="rgba(0, 0, 0, .3)" {...props}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Flex>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent gap={"md"} justify={"flex-start"} align={"flex-start"} direction={"row"} wrap={"wrap"} />; }

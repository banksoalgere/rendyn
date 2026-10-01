"use client";

import { Button, Group } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Group justify="center">
      <Button size={props.size}>Regular {props.size}</Button>
      <Button size={`compact-${props.size}`}>Compact {props.size}</Button>
    </Group>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent size={"md"} />; }

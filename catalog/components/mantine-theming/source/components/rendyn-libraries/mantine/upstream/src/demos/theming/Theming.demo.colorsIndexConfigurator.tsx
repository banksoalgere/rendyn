"use client";

import { Button, Text } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <>
      <Text c={`blue.${props.index}`}>Text with blue.{props.index} color</Text>
      <Button color={`cyan.${props.index}`} mt="sm">
        Button
      </Button>
    </>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent index={6} />; }

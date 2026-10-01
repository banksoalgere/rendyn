"use client";

import { Button, TextInput } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <>
      <Button radius={props.defaultRadius} fullWidth>
        Button with defaultRadius
      </Button>
      <TextInput
        mt="sm"
        radius={props.defaultRadius}
        label="TextInput with defaultRadius"
        placeholder="TextInput with default radius"
      />
    </>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent defaultRadius={"sm"} />; }

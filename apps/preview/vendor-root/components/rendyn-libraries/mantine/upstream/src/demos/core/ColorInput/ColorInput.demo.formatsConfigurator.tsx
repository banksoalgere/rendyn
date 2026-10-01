"use client";

import { ColorInput, ColorInputProps } from '@mantine/core';

function Wrapper(props: ColorInputProps) {
  return (
    <ColorInput
      maw={320}
      mx="auto"
      label="Choose color format"
      placeholder={props.format}
      defaultValue="#C5D899"
      {...props}
    />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent format={"hex"} />; }

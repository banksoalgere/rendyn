"use client";

import { useState } from 'react';

import { ColorPicker, ColorPickerProps, Stack, Text } from '@mantine/core';

function Wrapper(props: ColorPickerProps) {
  const [value, onChange] = useState('#C5D899');

  return (
    <Stack align="center">
      <ColorPicker value={value} onChange={onChange} {...props} />
      <Text>{value}</Text>
    </Stack>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent format={"hex"} />; }

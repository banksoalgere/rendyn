"use client";

import { Slider } from '@mantine/core';

function Demo(props: any) {
  return (
    <Slider
      marks={[
        { value: 20, label: '20%' },
        { value: 80, label: '80%' },
      ]}
      defaultValue={40}
      labelAlwaysOn
      mb={40}
      {...props}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

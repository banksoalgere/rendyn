"use client";

import { Slider } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Slider
      defaultValue={40}
      marks={[
        { value: 20, label: '20%' },
        { value: 50, label: '50%' },
        { value: 80, label: '80%' },
      ]}
      {...props}
    />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} size={"md"} radius={"xl"} showLabelOnHover={true} labelAlwaysOn={false} />; }

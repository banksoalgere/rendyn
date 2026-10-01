"use client";

import { Radio, RadioProps } from '@mantine/core';

function Wrapper(props: RadioProps) {
  return (
    <Radio.Group name="demo" defaultValue="react">
      <Radio value="react" {...props} />
    </Radio.Group>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent labelPosition={"right"} label={"I cannot be unchecked"} description={""} error={""} size={"sm"} color={"blue"} variant={"filled"} />; }

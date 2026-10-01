"use client";

import { CrosshairIcon } from '@phosphor-icons/react';

import { ColorInput } from '@mantine/core';

function Demo() {
  return (
    <ColorInput
      eyeDropperIcon={<CrosshairIcon size={18} />}
      label="With custom eye dropper icon"
      placeholder="Pick color"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

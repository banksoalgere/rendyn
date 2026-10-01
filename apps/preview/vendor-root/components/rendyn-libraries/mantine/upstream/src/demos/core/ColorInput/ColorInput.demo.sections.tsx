"use client";

import { EyedropperIcon } from '@phosphor-icons/react';

import { ColorInput } from '@mantine/core';

function Demo() {
  const icon = <EyedropperIcon size={18} />;

  return (
    <>
      <ColorInput
        label="With custom left section"
        placeholder="Replaces color swatch"
        leftSection={icon}
        leftSectionPointerEvents="none"
        withEyeDropper={false}
      />
      <ColorInput
        label="With custom right section"
        placeholder="Replaces eye dropper"
        rightSection={icon}
        rightSectionPointerEvents="none"
        mt="md"
      />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { MaskInput } from '@mantine/core';

function Demo() {
  return (
    <MaskInput label="Phone number" placeholder="(___) ___-____" mask="(999) 999-9999" disabled />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

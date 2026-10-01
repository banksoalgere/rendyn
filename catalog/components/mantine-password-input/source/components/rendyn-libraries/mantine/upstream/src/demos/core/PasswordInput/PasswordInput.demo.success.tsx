"use client";

import { PasswordInput } from '@mantine/core';

function Demo() {
  return (
    <PasswordInput label="Password Input" placeholder="Password Input" success="Looks good!" />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

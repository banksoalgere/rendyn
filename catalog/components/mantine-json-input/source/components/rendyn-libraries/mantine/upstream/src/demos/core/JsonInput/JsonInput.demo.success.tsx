"use client";

import { JsonInput } from '@mantine/core';

function Demo() {
  return <JsonInput label="JSON config" placeholder="JSON config" success="Valid JSON" />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

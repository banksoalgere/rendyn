"use client";

import { JsonInput } from '@mantine/core';

function Demo() {
  return <JsonInput placeholder="Enter JSON" formatOnBlur autosize minRows={4} loading />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

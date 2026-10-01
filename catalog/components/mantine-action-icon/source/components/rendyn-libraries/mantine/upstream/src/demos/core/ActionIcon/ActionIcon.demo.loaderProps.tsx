"use client";

import { ActionIcon } from '@mantine/core';

function Demo() {
  return <ActionIcon size="xl" loading aria-label="Loading..." loaderProps={{ type: 'dots' }} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

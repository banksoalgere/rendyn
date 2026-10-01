"use client";

import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box bg="virtual" c="white" p="md" fw={700}>
      This box has virtual background color, it is pink in dark mode and cyan in light mode
    </Box>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

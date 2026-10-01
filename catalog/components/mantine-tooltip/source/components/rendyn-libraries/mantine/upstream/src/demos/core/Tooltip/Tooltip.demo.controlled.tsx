"use client";

import { useState } from 'react';

import { Button, Tooltip } from '@mantine/core';

export function Demo() {
  const [opened, setOpened] = useState(false);

  return (
    <Tooltip label="Ctrl + J" opened={opened}>
      <Button onClick={() => setOpened((o) => !o)}>Toggle color scheme</Button>
    </Tooltip>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

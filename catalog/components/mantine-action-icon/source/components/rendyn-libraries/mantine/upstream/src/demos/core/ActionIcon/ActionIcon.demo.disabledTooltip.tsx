"use client";

import { HeartIcon } from '@phosphor-icons/react';

import { ActionIcon, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Tooltip for disabled button">
      <ActionIcon
        aria-label="Hover to see tooltip"
        size="xl"
        data-disabled
        onClick={(event) => event.preventDefault()}
      >
        <HeartIcon />
      </ActionIcon>
    </Tooltip>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

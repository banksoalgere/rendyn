"use client";

import { SlidersHorizontalIcon } from '@phosphor-icons/react';

import { ActionIcon } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <ActionIcon {...props} aria-label="Settings">
      <SlidersHorizontalIcon style={{ width: '70%', height: '70%' }} />
    </ActionIcon>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} size={"md"} radius={"md"} />; }

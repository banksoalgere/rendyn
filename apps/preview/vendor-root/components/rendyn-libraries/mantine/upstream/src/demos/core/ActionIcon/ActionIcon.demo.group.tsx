"use client";

import { GearSixIcon, HeartIcon, ImageIcon } from '@phosphor-icons/react';

import { ActionIcon } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <ActionIcon.Group {...props}>
      <ActionIcon variant="default" size="lg" aria-label="Gallery">
        <ImageIcon size={20} />
      </ActionIcon>

      <ActionIcon variant="default" size="lg" aria-label="Settings">
        <GearSixIcon size={20} />
      </ActionIcon>

      <ActionIcon variant="default" size="lg" aria-label="Likes">
        <HeartIcon size={20} />
      </ActionIcon>
    </ActionIcon.Group>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent orientation={"horizontal"} />; }

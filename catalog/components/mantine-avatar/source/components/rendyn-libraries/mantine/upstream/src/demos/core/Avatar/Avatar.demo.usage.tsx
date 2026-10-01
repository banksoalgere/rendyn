"use client";

import { StarIcon } from '@phosphor-icons/react';

import { Avatar, Group } from '@mantine/core';

import { avatars } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Avatar/_mockdata';

function Demo() {
  return (
    <Group justify="center">
      <Avatar src={avatars[0]} alt="it's me" />
      <Avatar radius="xl" />
      <Avatar color="cyan" radius="xl">
        MK
      </Avatar>
      <Avatar color="blue" radius="sm">
        <StarIcon size={20} />
      </Avatar>
    </Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

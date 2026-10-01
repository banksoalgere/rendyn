"use client";

import { Avatar } from '@mantine/core';

import { avatars } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Avatar/_mockdata';

function Demo() {
  return (
    <Avatar.Group>
      <Avatar src={avatars[0]} />
      <Avatar src={avatars[1]} />
      <Avatar src={avatars[2]} />
      <Avatar>+5</Avatar>
    </Avatar.Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { Avatar } from '@mantine/core';

import { avatars } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Avatar/_mockdata';

function Demo() {
  return (
    <Avatar
      component="a"
      href="https://github.com/rtivital"
      target="_blank"
      src={avatars[0]}
      alt="it's me"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

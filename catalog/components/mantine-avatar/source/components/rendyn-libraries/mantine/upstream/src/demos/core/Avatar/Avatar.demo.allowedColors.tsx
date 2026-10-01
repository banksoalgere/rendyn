"use client";

import { Avatar, Group } from '@mantine/core';

import { names, namesCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Avatar/_mockdata';

function Demo() {
  const avatars = names.map((name) => (
    <Avatar key={name} name={name} color="initials" allowedInitialsColors={['blue', 'red']} />
  ));
  return <Group>{avatars}</Group>;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

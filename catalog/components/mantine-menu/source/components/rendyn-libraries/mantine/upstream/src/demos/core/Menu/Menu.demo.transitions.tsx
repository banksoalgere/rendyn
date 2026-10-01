"use client";

import { Menu } from '@mantine/core';

import { DemoMenuItems } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Menu/_menu-items';

function Demo() {
  return (
    <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
      <DemoMenuItems />
    </Menu>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

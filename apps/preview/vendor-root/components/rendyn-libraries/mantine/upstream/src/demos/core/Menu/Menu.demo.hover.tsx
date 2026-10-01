"use client";

import { Menu } from '@mantine/core';

import { DemoMenuItems } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Menu/_menu-items';

function Demo() {
  return (
    <Menu trigger="hover" openDelay={100} closeDelay={400}>
      <DemoMenuItems />
    </Menu>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

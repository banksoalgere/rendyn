"use client";

import { Menu } from '@mantine/core';

import { DemoMenuItems } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Menu/_menu-items';

function Demo(props: any) {
  return (
    <Menu {...props} opened withArrow position="left" trapFocus={false}>
      <DemoMenuItems />
    </Menu>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { Menu, MenuProps } from '@mantine/core';

import { DemoMenuItems } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Menu/_menu-items';

function Wrapper(props: MenuProps) {
  return (
    <Menu opened trapFocus={false} {...props}>
      <DemoMenuItems />
    </Menu>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent position={"bottom"} offset={5} withArrow={false} arrowPosition={"side"} />; }

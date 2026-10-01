"use client";

import { ChatCircleIcon, GearSixIcon, ImageIcon } from '@phosphor-icons/react';

import { Tabs, TabsProps, useDirection } from '@mantine/core';

function Wrapper(props: TabsProps) {
  const { dir } = useDirection();
  const panelProps =
    props.orientation === 'vertical' ? { [dir === 'rtl' ? 'pr' : 'pl']: 'xs' } : { pt: 'xs' };

  return (
    <Tabs defaultValue="gallery" {...props}>
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<ImageIcon size={12} />}>
          Gallery
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<ChatCircleIcon size={12} />}>
          Messages
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection={<GearSixIcon size={12} />}>
          Settings
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" {...panelProps}>
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages" {...panelProps}>
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings" {...panelProps}>
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} variant={"default"} radius={"md"} orientation={"horizontal"} />; }

"use client";

import { ChatCircleIcon, GearSixIcon, ImageIcon } from '@phosphor-icons/react';

import { Tabs } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Tabs/Tabs.demo.customize.module.css';

function Demo() {
  return (
    <Tabs variant="unstyled" defaultValue="settings" classNames={classes}>
      <Tabs.List grow>
        <Tabs.Tab value="settings" leftSection={<GearSixIcon size={16} />}>
          Settings
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<ChatCircleIcon size={16} />}>
          Messages
        </Tabs.Tab>
        <Tabs.Tab value="gallery" leftSection={<ImageIcon size={16} />}>
          Gallery
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

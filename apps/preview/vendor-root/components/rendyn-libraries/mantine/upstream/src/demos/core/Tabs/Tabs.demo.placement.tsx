"use client";

import { Tabs, TabsProps } from '@mantine/core';

function Wrapper(props: TabsProps) {
  const panelProps = props.placement === 'left' ? { pl: 'xs' } : { pr: 'xs' };
  return (
    <Tabs defaultValue="gallery" orientation="vertical" {...props}>
      <Tabs.List>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="messages">Messages</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
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
export function RendynExample() { return <RendynExampleComponent placement={"left"} />; }

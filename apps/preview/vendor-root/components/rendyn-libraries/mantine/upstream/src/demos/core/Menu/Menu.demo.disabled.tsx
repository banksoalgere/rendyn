"use client";

import {
  ArrowsLeftRightIcon,
  ChatCircleIcon,
  GearSixIcon,
  ImageIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from '@phosphor-icons/react';

import { Button, Menu } from '@mantine/core';

function Demo() {
  return (
    <Menu>
      <Menu.Target>
        <Button>Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<GearSixIcon size={14} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<ChatCircleIcon size={14} />}>Messages</Menu.Item>
        <Menu.Item leftSection={<ImageIcon size={14} />}>Gallery</Menu.Item>
        <Menu.Item leftSection={<MagnifyingGlassIcon size={14} />} disabled>
          Search
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item leftSection={<ArrowsLeftRightIcon size={14} />}>Transfer my data</Menu.Item>
        <Menu.Item color="red" leftSection={<TrashIcon size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

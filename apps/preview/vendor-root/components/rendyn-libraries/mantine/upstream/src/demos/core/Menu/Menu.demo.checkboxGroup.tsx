"use client";

import { useState } from 'react';

import { Button, Menu } from '@mantine/core';

function Demo() {
  const [columns, setColumns] = useState(['name', 'email']);

  return (
    <Menu shadow="md" width={220} closeOnItemClick={false}>
      <Menu.Target>
        <Button>Columns</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Visible columns</Menu.Label>
        <Menu.CheckboxGroup value={columns} onChange={setColumns}>
          <Menu.CheckboxItem value="name">Name</Menu.CheckboxItem>
          <Menu.CheckboxItem value="email">Email</Menu.CheckboxItem>
          <Menu.CheckboxItem value="role">Role</Menu.CheckboxItem>
          <Menu.CheckboxItem value="lastSeen">Last seen</Menu.CheckboxItem>
        </Menu.CheckboxGroup>
      </Menu.Dropdown>
    </Menu>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

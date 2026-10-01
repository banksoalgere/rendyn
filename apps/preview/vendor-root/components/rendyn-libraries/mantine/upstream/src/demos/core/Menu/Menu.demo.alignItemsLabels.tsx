"use client";

import { Menu, MenuProps } from '@mantine/core';

function Wrapper(props: MenuProps) {
  return (
    <Menu opened trapFocus={false} closeOnItemClick={false} width={240} shadow="md" {...props}>
      <Menu.Target>
        <button type="button">Toggle menu</button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>View details</Menu.Item>
        <Menu.Item>Duplicate</Menu.Item>
        <Menu.Divider />
        <Menu.CheckboxItem defaultChecked>Pinned</Menu.CheckboxItem>
        <Menu.CheckboxItem>Archived</Menu.CheckboxItem>
        <Menu.Divider />
        <Menu.RadioGroup defaultValue="newest">
          <Menu.RadioItem value="newest">Newest first</Menu.RadioItem>
          <Menu.RadioItem value="oldest">Oldest first</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Dropdown>
    </Menu>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent alignItemsLabels={"with-indicators"} />; }

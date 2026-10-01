"use client";

import { List } from '@mantine/core';

function Demo() {
  return (
    <List type="ordered" reversed>
      <List.Item>This is item #3</List.Item>
      <List.Item>This is item #2</List.Item>
      <List.Item>This is item #1</List.Item>
    </List>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
